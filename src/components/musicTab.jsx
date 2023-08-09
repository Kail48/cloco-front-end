import React from 'react'

export default function MusicTab({artist,close}) {
  return (
    <div className='h-96 text-black'>
        <div className="flex justify-end w-full">
            <span onClick={close} className='cursor-pointer'>close</span>
        </div>
        <h1 className='md:text-xl font bold '>Songs by {artist.name}</h1>
    </div>
  )
}
