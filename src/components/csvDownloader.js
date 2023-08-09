import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FileDownloader = () => {
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();
  const handleDownload = () => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
    }
    setDownloading(true);

    axios({
      url: "http://127.0.0.1:5000/artists/csv", // Replace with the actual API endpoint
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "artists.csv"); //desired filename
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloading(false);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        setDownloading(false);
      });
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="py-3 px-2 bg-black text-white rounded-md hover:bg-gray-400 hover:text-black"
      >
        {downloading ? "Downloading..." : "Export artist to csv"}
      </button>
    </div>
  );
};

export default FileDownloader;
