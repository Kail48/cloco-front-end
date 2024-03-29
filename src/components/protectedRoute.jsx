import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "../pages/dashboard";
import baseUrl from "../services/api";
export default function ProtectedRoute() {
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();
  const verifyAdmin = (token) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/admin/verify`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPass(true);
      })
      .catch((error) => {
        navigate("/login");
      });
  };

  useEffect(() => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
      verifyAdmin(token);
    }
  }, []);
  return <>{pass ? <Dashboard /> : null}</>;
}
