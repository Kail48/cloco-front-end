import React from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast, { Toaster } from 'react-hot-toast';
export default function LoginPage() {
  const navigate= useNavigate()
  const sendLoginData=(data)=>{
    const postData = JSON.stringify(data);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5000/login',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer any'
      },
      data : postData
    };
    
    axios.request(config)
    .then((response) => {
      if(response.data.is_admin===true){
        localStorage.setItem("token",response.data.access_token)
        console.log(localStorage.getItem("token"))
        navigate('/dashboard')
      }
    })
    .catch((error) => {
      toast.error(error.response.data.error_message);
  
    });
}
    const handleSubmit=(e)=>{
        e.preventDefault()
        let data={}
        for(let i=0;i<e.target.length;i++){
            data[e.target[i].name.toString()]=e.target[i].value
        }
        sendLoginData(data)
        
    }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
       <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto animate-bounce" src={logo} alt="Cloco Music" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={e=>{
            e.preventDefault()
            handleSubmit(e)
            }}>
          <div>
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                for="password"
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
                autocomplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <a
            href="/register"
            className="font-semibold leading-6 text-black hover:text-indigo-500"
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
