import React from 'react'
import UserList from './user-list'

export default function UsersTab() {

  return (
    <div className="w-full h-full overflow-y-scroll my-8 ">
    <div className="flex w-full">
    
     <UserList/>
    </div>
 </div>
  )
}

