import React, { useState,useEffect } from 'react'
import ArtistList from './artistList';
import { useDisclosure } from '@mantine/hooks';
import { Drawer} from '@mantine/core';
import ArtistForm from './createArtist';
import toast, { Toaster } from "react-hot-toast";
import FileDownloader from './csvDownloader';
import FileUploader from './csvUploader';
import MusicTab from './musicTab';
export default function ArtistTab() {

const [activeArtistTab,setActiveArtistTab]=useState("artist-list")
const [opened, { open, close }] = useDisclosure(false);
const [refreshToggle,setRefreshToggle]=useState(false)
const [musicViewArtist,setMusicViewArtist]=useState(null)
const viewMusicPage=(artist)=>{
  console.log("artist",artist)
  setActiveArtistTab("music-list");
  setMusicViewArtist(artist);
}
const viewArtistPage=()=>{
  setActiveArtistTab("artist-list");
  setMusicViewArtist(null);
}

const pages={
    //this acts as store for tabs, teh setTab prop is callback funtion to set tabs
    "artist-list":<ArtistList viewMusicPage={viewMusicPage}/>,
    "music-list":<MusicTab artist={musicViewArtist} close={viewArtistPage}/>

}
const refreshTab=()=>setRefreshToggle(!refreshToggle)
useEffect(() => {
  
}, [refreshToggle]);
  return (
    <div className="w-full h-full overflow-y-scroll my-8 ">
        
    <div className="flex w-full">
    
     {pages[activeArtistTab]}
    </div>
    <Toaster/>
   {activeArtistTab==="artist_list" && (
     <div className='flex justify-evenly py-6 pr-10 gap-x-6 mt-6'>
     <button  onClick={open} className="py-3 px-2 bg-black text-white rounded-md hover:bg-gray-400 hover:text-black">Add New Artist</button>
     <FileDownloader/>
     <FileUploader refreshTab={refreshTab}/>
     </div>
   )}
    <Drawer opened={opened} onClose={close} title="">
        <ArtistForm/>
      </Drawer>
 </div>
  )
}
