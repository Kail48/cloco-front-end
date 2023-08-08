import React from 'react'
import UserList from './user-list'

export default function UsersTab() {

  return (
    <div className="w-full h-full overflow-y-scroll bg-gray-100 my-8 ">
    <div className="flex w-full">
     {/* <button className="w-20 h-8 py-1 bg-black text-white mx-4 my-2 hover:bg-gray-600">Add user</button> */}
     <UserList/>
    </div>
 </div>
  )
}

