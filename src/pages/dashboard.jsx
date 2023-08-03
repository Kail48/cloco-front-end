import React from "react";
import logOutIcon from "../assets/images/icons8-logout-50.png";
import { Tabs } from "@mantine/core";
import UserForm from "../components/user-form";
import UserList from "../components/user-list";
export default function Dashboard() {
  return (
    <div className="h-screen ">
      <div className="flex justify-between py-2 px-4">
        <h1 className="md:text-5xl font-sans ">Admin Dashboard</h1>
        <div className="group cursor-pointer">
          <img className="cursor-pointer h-10 w-10" src={logOutIcon} alt="" />
          <h3 className="text-xl group-hover:text-red-500">Logout</h3>
        </div>
      </div>
      <div className="flex justify-center h-full py-2">
        <div className="w-full mx-2 h-full bg-gray-200 my-5 px-2 py-2">
          <Tabs color="dark" variant="pills" orientation="horizontal" defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="user">
                Users
              </Tabs.Tab>
           
              <Tabs.Tab value="artist">
                Artists
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="user" pl="xs">
             <div className="w-full h-96 bg-gray-100 my-8 ">
                <div className="flex w-full">
                 <button className="w-20 h-8 py-1 bg-black text-white mx-4 my-2 hover:bg-gray-600">Add user</button>
                 <UserList/>
                </div>
             </div>
            </Tabs.Panel>

            <Tabs.Panel value="artist" pl="xs">
            <div className="w-full h-96 bg-gray-100 my-8 ">
                
                </div>
            </Tabs.Panel>

           
          </Tabs>
        </div>
      </div>
    </div>
  );
}
