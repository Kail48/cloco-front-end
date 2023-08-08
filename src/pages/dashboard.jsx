import React from "react";
import logOutIcon from "../assets/images/icons8-logout-50.png";
import { Tabs } from "@mantine/core";
import UserForm from "../components/user-form";
import UserList from "../components/user-list";
import { useNavigate } from "react-router-dom";
import UsersTab from "../components/usersTab";
export default function Dashboard() {
  const navigate=useNavigate()
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex justify-between py-2 px-4 bg-[#A8A196]">
        <h1 className="md:text-2xl font-sans ">Admin Dashboard</h1>
        <div className="group cursor-pointer" onClick={()=>{
          localStorage.removeItem("token")
          navigate('/login')
        }}>
          <h3 className="md:text-md group-hover:text-[#61677A]  ">Logout</h3>
        </div>
      </div>
      <div className="flex justify-center h-full ">
        <div className="w-full h-full">
          <Tabs color="gray" variant="pills" orientation="vertical" defaultValue="user">
            <Tabs.List position="left" className="bg-[#61677A] px-2 h-screen gap-y-10 pt-10">
              <Tabs.Tab value="user">
                Users
              </Tabs.Tab>
           
              <Tabs.Tab value="artist">
                Artists
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="user" pl="xs">
             <UsersTab/>
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
