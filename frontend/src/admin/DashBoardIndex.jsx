import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import student from "../assets/graduated.png";
import teacher from "../assets/female.png";
import users from "../assets/profile.png";
import axios from "axios";
import { apiData } from "../constant/utils";

const Institute = () => {
  const { username, role, user } = useAuth();
  const [userData, setUserData] = useState([]);
  const handleuserData = async () => {
    try {
      const response = await axios.get(apiData.adminUsersdata, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log(response.data?.data);
      setUserData(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleuserData();
  }, []);

  useEffect(() => {
    // console.log("data will from userData", userData);
  }, [userData]);

  const stats = [
    {
      title: "Total Users",
      value: userData.length < 9 ? `0${userData.length}` : `${userData.length}`,
      illustration: `${users}`,
    },

    {
      title: "Total Teachers",
      value: "13k +38%",
      illustration: `${teacher}`,
    },
    {
      title: "Total Students",
      value: "24.5k -22%",
      illustration: `${student}`,
    },
  ];
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className=" mt-8 ">
        <div className="flex bg-white  p-8 rounded-lg shadow-md border border-gray-200  flex-col">
          <div className="-m-1.5  overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Id
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Name
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Email
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Profession
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Verified
                      </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        Address
                      </th>
                      <th className="px-6 py-3 text-end text-xs font-medium text-gray-800 uppercase ">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-300">
                    {userData &&
                    Array.isArray(userData) &&
                    userData.length > 0 ? (
                      userData.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize ">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize ">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            +91-{item.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.role === 1 ? "Teacher" : "Student"}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800`}
                          >
                            <span
                              className={` ${
                                item.role === 0
                                  ? "bg-red-200 text-red-600 border border-red-400"
                                  : "bg-green-200 text-green-600  border-green-400 border"
                              } px-6 py-1 rounded-md whitespace-nowrap text-sm text-center  text-gray-800`}
                            >
                              {item.role === 0 ? "Not Verified" : "Verified"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institute;
