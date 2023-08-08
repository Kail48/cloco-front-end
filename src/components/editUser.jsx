import React, { useState } from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function EditUser({user,refreshList}) {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [firstName,setFirstName]=useState(user.first_name)
    const [lastName,setLastName]=useState(user.last_name)
    const [gender,setGender]=useState(user.gender)
    const [phone,setPhone]=useState(user.phone)
    const [address,setAddress]=useState(user.address)
    const [dob,setDob]=useState(user.dob)
    const sendEditData = (data) => {
      let token = null;
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        token = localStorage.getItem("token");
      }
      const postData = JSON.stringify(data);
      console.log(postData);
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:5000/user/${user.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: postData,
      };
  
      axios
        .request(config)
        .then((response) => {
            console.log(response)
          //show success message and redirect to login
          setSuccess(true)
        //   toast.success(response.data.message);
          refreshList()
        })
        .catch((error) => {
          //check if error is coming from axios or from server
          console.log(error);
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
        if(firstName!==user.first_name){
            data["first_name"]=firstName
        }
        if(lastName!==user.last_name){
            data["last_name"]=lastName
        }
        if(gender!==user.gender){
            data["gender"]=gender
        }
        if(phone!==user.phone){
            data["phone"]=phone
        }
        if(dob!==user.dob){
            data["dob"]=dob
        }
        if(address!==user.address){
            data["address"]=address
        }
        console.log(data)
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
            Edit details for {`${user.first_name} ${user.last_name}`}
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
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e)=>{setFirstName(e.target.value)}}
                    id="first-name"
                    name="first_name"
                    type="text"
                    autoComplete="first-name"
                    value={firstName}
             
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e)=>{setLastName(e.target.value)}}
                    id="last-name"
                    name="last_name"
                    type="text"
                    autoComplete="last-name"
                    value={lastName}
              
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e)=>{setPhone(e.target.value)}}
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    autoComplete="phone"
                    value={phone}
        
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
                  onChange={(e)=>{setGender(e.target.value)}}
                    id="gender"
                    name="gender"
                    value={gender}
          
                    className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
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
                  onChange={(e)=>{setDob(e.target.value)}}
                    id="birth-date"
                    name="dob"
                    type="date"
                    value={dob}
     
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
                  onChange={(e)=>{setAddress(e.target.value)}}
                    id="address"
                    name="address"
                    type="text"
        
                    value={address}
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
