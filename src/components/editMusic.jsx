import React, { useState } from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../services/api";
export default function EditMusic({ music, refreshList }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState(music.title);
  const [genre, setGenre] = useState(music.genre);
  const [album, setAlbum] = useState(music.album_name);

  const sendEditData = (data) => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
    }
    const postData = JSON.stringify(data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/${music.id}`,
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
        //   toast.success(response.data.message);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    if (title !== music.title) {
      data["title"] = title;
    }
    if (genre !== music.genre) {
      data["genre"] = genre;
    }
    if (album !== music.album_name) {
      data["album"] = album;
    }

    sendEditData(data);
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto animate-bounce"
          src={logo}
          alt="Cloco Music"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit details for {music.title}
        </h2>
      </div>

      {success ? (
        <div className="w-full flex items-center justify-center">
          <h1>Details updated! you can now close this drawer</h1>
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
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="name"
                  value={title}
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
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  id="genre"
                  name="genre"
                  value={genre}
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="rock">Rock</option>
                  <option value="jazz">Jazz</option>
                  <option value="classic">Classic</option>
                  <option value="rnb">R&B</option>
                  <option value="country">Country</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="album"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Album
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setAlbum(e.target.value);
                  }}
                  id="album"
                  name="album_name"
                  type="text"
                  value={album}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
