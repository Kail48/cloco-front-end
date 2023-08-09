import React, { useState } from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../services/api";
export default function MusicForm({ artistId, refreshTab }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const sendRegisterData = (data) => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
    }

    data["artist_id"] = artistId;

    const postData = JSON.stringify(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/music`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: postData,
    };

    axios
      .request(config)
      .then((response) => {
        //show success message and redirect to login

        setSuccess(true);
        toast.success(response.data.message);
        refreshTab();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    for (let i = 0; i < e.target.length; i++) {
      data[e.target[i].name.toString()] = e.target[i].value;
    }

    sendRegisterData(data);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto animate-bounce"
          src={logo}
          alt="Cloco Music"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Music
        </h2>
      </div>

      {success ? (
        <div className="w-full flex items-center justify-center">
          <h1>New Music added you can now close this drawer</h1>
        </div>
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="title"
                  type="text"
                  autoComplete="name"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Genre
              </label>
              <div className="mt-2">
                <select
                  id="genre"
                  name="genre"
                  required
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="rnb">R&B</option>
                  <option value="jazz">Jazz</option>
                  <option value="country">Country</option>
                  <option value="classic">Classic</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="album"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Album
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="album"
                  name="album_name"
                  type="text"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add new Music
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
