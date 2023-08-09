import React from "react";
import closeIcon from '../assets/images/cancel.png'
import { useDisclosure } from '@mantine/hooks';
import { useState,useEffect } from "react";
import { Drawer} from '@mantine/core';
import MusicForm from "./createMusic";
import MusicList from "./musicList";
export default function MusicTab({ artist, closeMusicList }) {
    
    const [refreshToggle,setRefreshToggle]=useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    const refreshTab=()=>{
        
        setRefreshToggle(!refreshToggle);
    }
useEffect(() => {
  
    },[refreshToggle]);
  return (
    <div className="h-96 text-black">
        <div  onClick={closeMusicList} className="absolute right-10 top-16">
            <img src={closeIcon} alt="" className="w-8 h-8 cursor-pointer hover:scale-110"/>
        </div>
      <h1 className="md:text-xl font bold text-center mb-2">Songs by {artist.name}</h1>
      <button  onClick={open} className="py-2 px-2 bg-black text-white rounded-md hover:bg-gray-400 hover:text-black">Add New music</button>
      <div className="w-full h-96 overflow-y-scroll">
        <MusicList artistId={artist.id} refreshFromTab={refreshToggle} />
      </div> 
      <Drawer opened={opened} onClose={close} title="" position="right">
        <MusicForm artistId={artist.id} refreshTab={refreshTab}/>
      </Drawer>
    </div>
  );
}
