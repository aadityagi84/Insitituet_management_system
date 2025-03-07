import React, { useState, useEffect } from "react";
import { FiGrid, FiUsers } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import { apiData } from "../constant/utils";
import { FaPowerOff } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PiStudentDuotone } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { user, setUser, roleData } = useAuth();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]); // Added for Teachers dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    Students: false,
    Teachers: false,
  }); // Track dropdown state for each item
  const navigate = useNavigate();
  const avtarImg =
    "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg";

  // Fetch students data
  const fetchStudentsData = async () => {
    try {
      const response = await axios.get(apiData.getStudents, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      // console.log("Students response:", response.data?.data);
      setStudents(response.data?.data || []);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  // Fetch teachers data (assuming you have an endpoint for this)
  const fetchTeachersData = async () => {
    try {
      const response = await axios.get(apiData.teacherdata, {
        // Replace with actual endpoint
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      // console.log("Teachers response:", response.data?.data);
      setTeachers(response.data?.data || []);
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchStudentsData();
    if (roleData === 0 || roleData === 1) fetchTeachersData();
  }, [roleData]);

  const getMenuItems = () => {
    switch (roleData) {
      case 0: // Admin
        return [
          { name: "Dashboard", icon: FiGrid, link: "/dashboard" },
          {
            name: "Students",
            icon: FiUsers,
            link: "/student",
            hasDropdown: true,
          },
          {
            name: "Teachers",
            icon: FiUsers,
            link: "/teacher",
            hasDropdown: true,
          },
        ];
      case 1: // Teacher
        return [
          { name: "Edit Profile", icon: FiGrid, link: "/teacher" },
          {
            name: "Students",
            icon: FiUsers,
            link: "/student",
            hasDropdown: true,
          },
        ];
      default: // Student
        return [{ name: "Edit Profile", icon: FiGrid, link: "/student" }];
    }
  };

  const menuItems = getMenuItems();

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

  // Toggle dropdown for a specific item
  const toggleDropdown = (itemName) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex fixed flex-col h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <div className="w-full border-b py-4">
        <h1 className="text-xl text-center font-bold">
          <span className="text-red-600">Institute</span> Management
        </h1>
      </div>
      <div className="px-4 py-3 flex items-center justify-center gap-2 text-sm text-white">
        <div>
          <img
            id="avatarButton"
            type="button"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={avtarImg}
            alt="User dropdown"
          />
        </div>
        <div className="text-red-600">Welcome</div>
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
            <div key={item.name}>
              <NavLink
                to={item.link}
                onClick={(e) => {
                  setActiveItem(item.name);
                  if (item.hasDropdown) {
                    e.preventDefault(); // Prevent navigation if clicking to toggle dropdown
                    toggleDropdown(item.name);
                  }
                }}
                className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md ${
                  isActive ? "bg-purple-500 text-white" : "hover:bg-gray-700"
                }`}
              >
                <Icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>

              {/* Dropdown for Students or Teachers */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {isDropdownOpen[item.name] && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-10 bg-gray-800 rounded-lg mt-1 overflow-hidden"
                    >
                      {item.name === "Students" && (
                        <>
                          {students.length > 0 ? (
                            students.map((student, index) => (
                              <NavLink
                                key={index}
                                to={`/student/${student.id}`} // Example: Navigate to student profile
                                className="flex  items-center  gap-4 font-semibold  px-4 py-2 text-[15px] hover:bg-gray-700 cursor-pointer Capitalize"
                              >
                                <PiStudentDuotone className="text-[18px]" />
                                {student.name || "Unnamed Student"}
                              </NavLink>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">
                              No students found
                            </div>
                          )}
                        </>
                      )}
                      {item.name === "Teachers" && roleData === 0 && (
                        <>
                          {teachers.length > 0 ? (
                            teachers.map((teacher, index) => (
                              <NavLink
                                key={index}
                                to={`/teacher/${teacher.id}`}
                                className="flex  items-center  gap-4 font-semibold  px-4 py-2 text-[15px] hover:bg-gray-700 cursor-pointer Capitalize"
                              >
                                <PiChalkboardTeacher className="text-[18px]" />

                                {teacher.name || "Unnamed Teacher"}
                              </NavLink>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">
                              No teachers found
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
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
