import React from "react";
import logo from "../assets/images/cloco-logo.svg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import baseUrl from "../services/api";
export default function LoginPage() {
  const navigate = useNavigate();
  const sendLoginData = (data) => {
    const postData = JSON.stringify(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/login`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer any",
      },
      data: postData,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.is_admin === true) {
          localStorage.setItem("token", response.data.access_token);

          navigate("/dashboard");
        } else {
          toast(
            "😅 You are Trying to login from a normal account.\n We only support admin accounts for now.\n please create a new admin account.",
            {
              duration: 6000,
            }
          );
        }
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
    sendLoginData(data);
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
          Sign in to your account
        </h2>
      </div>

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
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have account?
          <Link to="/register"  className="font-semibold leading-6 text-black hover:text-indigo-500">
          SignUp
          </Link>
         
        </p>
      </div>
    </div>
  );
}
