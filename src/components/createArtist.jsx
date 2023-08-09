import React, { useState } from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ArtistForm({ refresh }) {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const sendRegisterData = (data) => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
    }
    const postData = JSON.stringify(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:5000/artist",
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
        refresh();
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
          Add New Artist
        </h2>
      </div>

      {success ? (
        <div className="w-full flex items-center justify-center">
          <h1>New Artist added you can now close this drawer</h1>
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
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="first-release"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Debut Year
              </label>
              <div className="mt-2">
                <input
                  id="first-release"
                  name="first_release_year"
                  type="number"
                  min="1000"
                  max="3000"
                  autoComplete="phone"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  required
                  className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="M">Male</option>
                  <option value="T">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="birth-date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="birth-date"
                  name="dob"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="albums"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  No. of Albums
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="albums"
                  name="number_of_albums_released"
                  type="number"
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
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
