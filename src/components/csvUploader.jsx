import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from "react-hot-toast";
const FileUploader = ({refreshTab}) => {
    const navigate=useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("please select a file");
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData)
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
     
    }
    setUploading(true);

  
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:5000/artists/csv",
        headers: {
         
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      axios
      .request(config)
      .then((response) => {
        toast.success("successfully uploaded artist records")
        console.log('File uploaded successfully:', response.data);
        setUploading(false);
        refreshTab()
      })
      .catch((error) => {
        setUploading(false)
        
        console.log(error);
        if (error.message) {
          if (error.message === "Network Error") {
            navigate("/server-not-found");
          }
        }
        if(error.response){
            if (error.response.data.msg) {
                if (error.response.data.msg === "Token has expired") {
                  toast.error(
                    "session has expired login again! please login again"
                  );
                  setTimeout(() => {
                    navigate("/login");
                  }, 1500);
                }
              }
        }
        //if error is coming from backend display it as toast
        if (error.response != null) {
          toast.error(error.response.data.error_message);
        }
      });
  };

  return (
    <div className='bg-gray-400 px-2 py-1 rounded-md'>
        <Toaster/>
      <input type="file" onChange={handleFileChange} className=""/>
      <button onClick={handleUpload} disabled={uploading}
      className="py-2 px-2 bg-black text-white rounded-md hover:bg-gray-400 hover:text-black">
        {uploading ? 'Uploading...' : 'Import from Csv'}
      </button>
    </div>
  );
};

export default FileUploader;
