import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = ' http://127.0.0.1:5000';

const useAxios = ({ url, method, body = null, headers = null }) => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        let token="no"
        if(!localStorage.getItem("token")){
            console.log("not logged in")
        }
        else{
            console.log("logged in")
            token=localStorage.getItem("token")
        }
    
        let h=JSON.parse(headers)
 
        console.log(h)
        axios[method](url,JSON.parse(body),{
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        })
            .then((res) => {
                console.log("res",res)
                setResponse(res.data);
            })
            .catch((err) => {
                if(err.message==="Network Error"){
                    navigate('/server-not-found')
                }
                console.log(err)
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;
