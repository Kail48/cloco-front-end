import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mantine/core';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
export default function UserList() {
  const navigate=useNavigate()
    const [activePage, setPage] = useState(1);
    const [users,setUsers]=useState(null)
    const [totalPage,setTotalPage]=useState(0)

    
    const fetchUsers=(token)=>{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:5000/users?page=${activePage}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      axios.request(config)
    .then((response) => {
      setUsers(response.data.users)
      setTotalPage(response.data.total_pages-1)
      
    })
    .catch((error) => {
      console.log(error.response.data);
      if(error.response){
        if(error.response.data.msg){
          if(error.response.data.msg==="Token has expired"){
            toast.error("session has expired login again! please login again")
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          }
        }
      }
    });
    
    }
    useEffect(() => {
      let token=null
      if(!localStorage.getItem("token")){
        navigate('/login')
    }
    else{
        token=localStorage.getItem("token")
        fetchUsers(token)
    }

  }, [activePage]);
  return (
    <div className='w-full h-96 flex flex-col justify-between px-4 py-5'>
      <Toaster/>
       <div className='w-full overflow-y-scroll'>
        { users?
          users.map((user,index)=>(
            <div key={index}>{user.first_name}</div>
          )):<div>loading</div>
        }
       </div>
       <div className='px-2 py-1'> 
       <Pagination value={activePage} onChange={setPage} total={totalPage} color="dark" size="sm" />
       </div>
    </div>
  )
}
