import React from "react";
import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Drawer} from '@mantine/core';

import DeleteArtistDialog from "./deleteArtistDialog";
import EditArtist from "./editArtist";
export default function ArtistList({viewMusicPage,refresh}) {
  const [opened, { open, close }] = useDisclosure(false);
  const getGenderFromInitial = (code) => {
    if (code === "M") return "Male";
    if (code === "T") return "Female";
    if (code === "O") return "Other";
  };


  const navigate = useNavigate();
  const [activePage, setPage] = useState(1);
  const [artists, setArtists] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [refreshToggle, setrefreshToggle] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [currentArtist,setCurrentArtist]=useState(null)
  
const refreshList=()=>{
  setrefreshToggle(!refreshToggle)
}
  const openDrawer=(action,artist)=>{
    setCurrentArtist(artist)
    setModalAction(action)
    open()
  }
  const fetchArtists = (token) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/artists?page=${activePage}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data)
        setArtists(response.data.artist);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response) {
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
      });
  };
  useEffect(() => {
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
      fetchArtists(token);
    }
  }, [activePage,refreshToggle,refresh]);
  return (
    <div className="w-full h-96 flex flex-col justify-between px-4 py-5">
      <Toaster />
      <div className="w-full">
        {artists ? (
     
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
<h1 className='text-center md:text-xl font-bold'>Artists</h1>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Gender
                </th>
                <th scope="col" class="px-6 py-3">
                   Debut Year
                </th>
                <th scope="col" class="px-6 py-3">
                No of Albums
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Date of Birth
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {
            artists.map((artist,index)=>(
              <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {artist.name}
              </th>
              <td class="px-6 py-4">
                  {getGenderFromInitial(artist.gender)}
              </td>
              <td class="px-6 py-4">
                  {artist.first_release_year}
              </td>
              <td class="px-6 py-4">
                  {artist.number_of_albums_released}
              </td>
              <td class="px-6 py-4">
                  {artist.address}
              </td>
              <td class="px-6 py-4">
                  {artist.dob}
              </td>
              <td class="px-6 py-4 flex justify-around">
              <span  class="font-medium text-green-600  hover:underline cursor-pointer" onClick={()=>viewMusicPage(artist)}>View music</span>
                
                  <span  class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={()=>{
                    openDrawer("edit",artist)
                  }}>Edit</span>
                  <span  class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"  onClick={()=>{
                    openDrawer("delete",artist)
                  }}>Delete</span>
              </td>
          </tr>

            ))
          }
           
            
        </tbody>
    </table>
</div>

        ) : (
          <div className="flex justify-center items-center w-full h-72">
            <Loader color="dark" size="xl" variant="bars" />
          </div>
        )}
      </div>
      <div className="px-2 py-1 flex mt-12 justify-around">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={totalPage}
          color="dark"
          size="lg"
        />
        <Drawer opened={opened} onClose={close} title="">
          {
            modalAction==="delete"?<DeleteArtistDialog artist={currentArtist} refreshList={refreshList}/>:
            <EditArtist artist={currentArtist} refreshList={refreshList}/>
          }
        
      </Drawer>
      </div>
    </div>
  );
}
