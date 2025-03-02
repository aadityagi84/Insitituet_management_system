import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { apiData } from "../constant/utils";
import { FaPowerOff } from "react-icons/fa";

function Navbar() {
  const avtarImg =
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg";
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser, roleData } = useAuth();
  const isAuthenticated = !!user;

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
    <nav className="bg-gray-800 p-4 text-white pr-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Messaging App
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* Avatar Button */}
                <img
                  id="avatarButton"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={avtarImg}
                  alt="User dropdown"
                />

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute -left-20 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3 flex items-center justify-center  gap-2 text-sm text-gray-900 dark:text-white">
                      <div className="text-red-600">{"Welcome"}</div>
                      <div className="font-medium truncate">
                        {roleData === "0"
                          ? "Admin"
                          : roleData === "1"
                          ? "Teacher"
                          : "Student"}
                      </div>
                    </div>

                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to={
                            roleData === "0"
                              ? "/admin"
                              : roleData === "1"
                              ? "/teacher"
                              : "/student"
                          }
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {roleData === "0"
                            ? "Dashboard"
                            : roleData == "1"
                            ? " Edit Profile"
                            : "Edit Profile"}
                        </Link>
                      </li>

                      {roleData === "0" ? (
                        <>
                          <li>
                            <Link
                              to="/student"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Students
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/teacher"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Teachers
                            </Link>
                          </li>
                        </>
                      ) : (
                        roleData === "1" && (
                          <>
                            <li>
                              <Link
                                to="/student"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Students
                              </Link>
                            </li>
                          </>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-[25px] text-red-700 "
                >
                  <FaPowerOff />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
