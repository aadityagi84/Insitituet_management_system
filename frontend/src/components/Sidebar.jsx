// Sidebar.js
import React, { useState, useEffect } from "react";
import { FiGrid, FiUsers } from "react-icons/fi"; // Import only necessary icons
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { apiData } from "../constant/utils";
import { FaPowerOff } from "react-icons/fa";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { user, setUser, roleData } = useAuth(); // Get user and setUser from context
  const navigate = useNavigate();
  const avtarImg =
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg";
  // Menu items based on role
  const getMenuItems = () => {
    switch (roleData) {
      case 0: // Admin
        return [
          { name: "Dashboard", icon: FiGrid, link: "/" },
          { name: "Students", icon: FiUsers, link: "/student" },
          { name: "Teachers", icon: FiUsers, link: "/teacher" },
        ];
      case 1: // Teacher
        return [
          { name: "Edit Profile", icon: FiGrid, link: "/teacher" },
          { name: "Students", icon: FiUsers, link: "/student" },
        ];
      default: // Student (or any other role)
        return [{ name: "Edit Profile", icon: FiGrid, link: "/student" }];
    }
  };

  const menuItems = getMenuItems();

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get(apiData.logout, { withCredentials: true });
      Cookies.remove("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex fixed  flex-col h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <div className="w-full border-b py-4">
        <h1 className="text-xl text-center font-bold">
          <span className="text-red-600">Institute</span> Management
        </h1>
      </div>
      <div className="px-4 py-3 flex items-center justify-center gap-2 text-sm text-gray-900  text-white ">
        <div className="">
          <img
            id="avatarButton"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full cursor-pointer"
            src={avtarImg}
            alt="User dropdown"
          />
        </div>
        <div className="text-red-600">{"Welcome"}</div>
        <div className="font-medium truncate">
          {roleData === 0 ? "Admin" : roleData === 1 ? "Teacher" : "Student"}
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <NavLink
              key={item.name}
              to={item.link}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md ${
                isActive ? "bg-purple-500 text-white" : "hover:bg-gray-700"
              }`}
            >
              <Icon className="text-xl" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="py-1 absolute bottom-10 w-full">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left px-4 py-2 text-[17px] hover:bg-gray-700 text-red-700 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md bg-gray-800"
        >
          <FaPowerOff /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
