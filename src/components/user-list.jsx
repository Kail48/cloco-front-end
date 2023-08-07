import React from 'react'
import { useState } from 'react';
import { Pagination } from '@mantine/core';
export default function UserList() {
    const [activePage, setPage] = useState(1);
    const data=[]
  return (
    <div className='w-full'>
        <div className='h-72 w-full'>

        </div>
       <div className='px-2 py-1'> 
       <Pagination value={activePage} onChange={setPage} total={10} color="dark" size="sm" />
       </div>
    </div>
  )
}
