import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import DeleteMusicDialog from "./deleteMusicDialog";
import EditMusic from "./editMusic";
export default function MusicList({ artistId, refreshFromTab }) {
  const [opened, { open, close }] = useDisclosure(false);
  const getGenreFromInitial = (code) => {
    if (code === "rock") return "Rock";
    if (code === "rnb") return "R & B";
    if (code === "classic") return "Classic";
    if (code === "country") return "Country";
    if (code === "jazz") return "Jazz";
  };

  const navigate = useNavigate();
  const [musics, setMusics] = useState(null);
  const [refreshToggle, setrefreshToggle] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(null);

  const refreshList = () => {
    setrefreshToggle(!refreshToggle);
  };
  const openDrawer = (action, music) => {
    setCurrentMusic(music);
    setModalAction(action);
    open();
  };
  const fetchMusics = (token) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/musics?artist_id=${artistId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setMusics(response.data);
      })
      .catch((error) => {
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
      fetchMusics(token);
    }
  }, [refreshToggle, refreshFromTab]);
  return (
    <div className=" h-96  px-4 py-5">
      <Toaster />
      <div className="w-full">
        {musics ? (
          musics.length === 0 ? (
            <div className="w-full h-full">
              <h1>No music available for this artist</h1>
            </div>
          ) : (
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-center md:text-xl font-bold">Songs</h1>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-16 py-3">
                      Title
                    </th>
                    <th scope="col" class="px-16 py-3">
                      Genre
                    </th>
                    <th scope="col" class="px-16 py-3">
                      Album Name
                    </th>
                    <th scope="col" class="px-16 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {musics.map((music, index) => (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {music.title}
                      </th>
                      <td class="px-16 py-4">
                        {getGenreFromInitial(music.genre)}
                      </td>
                      <td class="px-16 py-4">{music.album_name}</td>

                      <td class="px-16 py-4 flex justify-around gap-x-4">
                        <span
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={() => {
                            openDrawer("edit", music);
                          }}
                        >
                          Edit
                        </span>
                        <span
                          class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                          onClick={() => {
                            openDrawer("delete", music);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center w-full h-72">
            <Loader color="dark" size="xl" variant="bars" />
          </div>
        )}
      </div>
      <div className="px-2 py-1 flex mt-12 justify-around">
        <Drawer opened={opened} onClose={close} title="">
          {modalAction === "delete" ? (
            <DeleteMusicDialog music={currentMusic} refreshList={refreshList} />
          ) : (
            <EditMusic music={currentMusic} refreshList={refreshList} />
          )}
        </Drawer>
      </div>
    </div>
  );
}
