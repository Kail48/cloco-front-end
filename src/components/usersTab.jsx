import React, { useState } from 'react'
import UserList from './user-list'
import { useDisclosure } from '@mantine/hooks';
import { Drawer} from '@mantine/core';
import UserForm from './createUser';

export default function UsersTab() {
const [activeUserTab,setActiveUserTab]=useState("userList")
const [opened, { open, close }] = useDisclosure(false);
const pages={
    //this acts as store for tabs, teh setTab prop is callback funtion to set tabs
    "userList":<UserList setTab={setActiveUserTab}/>,

}
  return (
    <div className="w-full h-full overflow-y-scroll my-8 ">
    <div className="flex w-full">
    
     {pages[activeUserTab]}
    </div>
    <div className='flex justify-end py-6 pr-10'>
    <button  onClick={open} className="py-2 px-2 bg-black text-white rounded-md hover:bg-gray-400 hover:text-black">Add new User</button>
    </div>
    <Drawer opened={opened} onClose={close} title="">
        <UserForm/>
      </Drawer>
 </div>
  )
}

