import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../services/api";
export default function DeleteArtistDialog({ artist, refreshList }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const sendDeleteId = (id) => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
    }
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${baseUrl}/artist/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        //show success message and redirect to login

        setSuccess(true);
        toast.success(response.data.message);
        refreshList();
      })
      .catch((error) => {
        //check if error is coming from axios or from server

        if (error.message) {
          if (error.message === "Network Error") {
            navigate("/server-not-found");
          }
        }
        //if error is coming from backend display it as toast
        if (error.response != null) {
          toast.error(error.response.data.error_message);
        }
      });
  };
  return (
    <div className="w-full h-96 flex justify-center items-center">
      {success ? (
        <div className="w-full flex items-center justify-center">
          <h1>Artist Deleted</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <h1 className="text-center md:text-xl">
            Do you want to delete records for {artist.name}?
          </h1>
          <button
            onClick={() => {
              sendDeleteId(artist.id);
            }}
            className="py-2 px-2 bg-red-800 text-white rounded-md hover:bg-red-400 mt-6"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
