import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import student from "../assets/graduated.png";
import teacher from "../assets/female.png";
import users from "../assets/profile.png";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { apiData } from "../constant/utils";
import Users from "./Users";
import Loader from "../pages/Loader";

const Institute = () => {
  const { username, role, user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [StudentData, setStudendtdata] = useState([]);
  const [teacherData, setTeachers] = useState([]);

  const handleuserData = async () => {
    try {
      const response = await axios.get(apiData.adminUsersdata, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      // console.log(response.data?.data);
      setUserData(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudentData = async () => {
    try {
      const response = await axios.get(apiData.studentData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      // console.log(response.data.data);
      setStudendtdata(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTeachersData = async () => {
    try {
      const response = await axios.get(apiData.teacherdata, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log(response.data.data);
      setTeachers(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleuserData();
    getStudentData();
    getTeachersData();
  }, []);

  useEffect(() => {
    console.log("data will from userData", teacherData);
  }, [userData, StudentData, teacherData]);

  const stats = [
    {
      title: "Total Users",
      value: userData.length < 9 ? `0${userData.length}` : `${userData.length}`,
      illustration: `${users}`,
    },

    {
      title: "Total Teachers",
      value:
        teacherData.length < 9
          ? `0${teacherData.length}`
          : `${teacherData.length}`,
      illustration: `${teacher}`,
    },
    {
      title: "Total Students",
      value:
        StudentData.length < 9
          ? `0${StudentData.length}`
          : `${StudentData.length}`,
      illustration: `${student}`,
    },
  ];
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="dashboard-header rounded-md">
        <div className="header-content ">
          <div className="w-full flex flex-col">
            <div className="flex  gap-2 items-center ">
              <FaHome className="header-icon" />
              <span className="header-title">Dashboard One</span>
            </div>
            <span className="welcome-text font-medium">
              Welcome to <span className="text-red-600">Insitute</span>{" "}
              Management System
            </span>
          </div>
          <button className="download-btn">
            <svg
              className="download-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 grid  gap-4 grid-cols-[90px,1fr]  items-start text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="">
              <img
                src={stat.illustration}
                alt={`${stat.title} illustration`}
                className="w-[100px] object-conatin mb-4 object-cover mx-auto"
              />
            </div>
            <div className="text-left pl-4">
              <h2 className="text-lg font-bold text-gray-800 ">{stat.title}</h2>
              <p className=" font-medium text-[30px] text-red-600 mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <Users />
    </div>
  );
};

export default Institute;
