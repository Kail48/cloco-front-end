import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import DeleteUserDialog from "./deleteUserDialog";
import baseUrl from "../services/api";
import EditUser from "./editUser";

export default function UserList({ refresh }) {
  const [opened, { open, close }] = useDisclosure(false);
  const getGenderFromInitial = (code) => {
    if (code === "M") return "Male";
    if (code === "T") return "Female";
    if (code === "O") return "Other";
  };

  const tableHeaders = [
    "Name",
    "Gender",
    "Email",
    "Phone",
    "Address",
    "Date of Birth",
    "Action",
  ];
  const navigate = useNavigate();
  const [refreshFromTab, setRefreshfromTab] = useState(refresh);
  const [activePage, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [refreshToggle, setrefreshToggle] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  console.log("started");
  const refreshList = () => {
    setrefreshToggle(!refreshToggle);
  };
  const openDrawer = (action, user) => {
    setCurrentUser(user);
    setModalAction(action);
    open();
  };
  const fetchUsers = (token) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/users?page=${activePage}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setUsers(response.data.users);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response) {
          if (error.response.data.msg) {
            if (error.response.data.msg === "Token has expired") {
              toast.error(
                "session has expired login again! please login again"
              );
              setTimeout(() => {
                navigate("/login");
              }, 1500);
            }
          }
        }
      });
  };
  useEffect(() => {
    console.log("from user list");
    let token = null;
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      token = localStorage.getItem("token");
      fetchUsers(token);
    }
  }, [activePage, refreshToggle, refresh]);
  return (
    <div className="w-full h-96 flex flex-col justify-between px-4 py-5">
      <Toaster />
      <div className="w-full">
        {users ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Birth
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </th>
                    <td className="px-6 py-4">
                      {getGenderFromInitial(user.gender)}
                    </td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.address}</td>
                    <td className="px-6 py-4">{user.dob}</td>
                    <td className="px-6 py-4 flex justify-around">
                      <span
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => {
                          openDrawer("edit", user);
                        }}
                      >
                        Edit
                      </span>
                      <span
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                        onClick={() => {
                          openDrawer("delete", user);
                        }}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-72">
            <Loader color="dark" size="xl" variant="bars" />
          </div>
        )}
      </div>
      <div className="px-2 py-1 flex mt-12 justify-around">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={totalPage}
          color="dark"
          size="lg"
        />
        <Drawer opened={opened} onClose={close} title="">
          {modalAction === "delete" ? (
            <DeleteUserDialog user={currentUser} refreshList={refreshList} />
          ) : (
            <EditUser user={currentUser} refreshList={refreshList} />
          )}
        </Drawer>
      </div>
    </div>
  );
}
