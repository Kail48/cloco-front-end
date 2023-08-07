import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/images/cloco-logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
export default function WelcomePage() {
  const [user, setUser] = useState(
    localStorage.getItem("authToken") ? "user" : null
  );

  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const notLoggedInMessage = "No user found! Redirecting to login";
  const loggedInMessage = "Welcome back! opening dashboard";
  const goToNextPage = () => {
   
    if (user !== null) {
      console.log("user found")
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  const verifyAdmin=(token)=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5000/admin/verify',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setUser("user")
    })
    .catch((error) => {

    });
  }
  useEffect(() => {
    let token=null
    if(!localStorage.getItem("token")){
      
  }
  else{
      token=localStorage.getItem("token")
      verifyAdmin(token)
  }
    setTimeout(() => {
      setIsReady(true);
    }, 1500);
  }, []);

  return (
    <div>
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="flex justify-center items-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 2, ease: "easeIn" }}
          >
            <div className="flex flex-col items-center">
              <img className="h-32 w-32" src={logo} alt="" />
              <h1 className="md:text-6xl">ARTIST</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isReady && (
          <motion.div
            className="flex justify-center items-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeIn" }}
            onAnimationComplete={goToNextPage}
          >
            <div className="flex flex-col items-center">
              <h1 className="md:text-6xl">{notLoggedInMessage}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
