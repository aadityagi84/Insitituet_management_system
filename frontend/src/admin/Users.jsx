import React, { useEffect, useState } from "react";
import { apiData } from "../constant/utils";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "../components/Model";

const Users = () => {
  const { username, role, user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userid, setuserid] = useState("");

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
  useEffect(() => {
    handleuserData();
  }, []);

  useEffect(() => {}, [userData]);
  const handleEditClick = (id, user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setuserid(id);
    console.log("Selected User ID:", id);
  };
  return (
    <div>
      <div className=" mt-4 ">
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
                      {/* <th className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase ">
                        TableId
                      </th> */}
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
                            {index + 1}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-800 capitalize ">
                            {item.id}
                          </td> */}
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
                            {item.role === 0
                              ? "Admin"
                              : item.role === 1
                              ? "Teacher"
                              : "Student"}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800`}
                          >
                            <span
                              className={` ${
                                item.is_verified === 0
                                  ? "bg-red-200 text-red-600 border border-red-400"
                                  : "bg-green-200 text-green-600  border-green-400 border"
                              } px-6 py-1 rounded-md whitespace-nowrap text-sm text-center  text-gray-800`}
                            >
                              {item.is_verified === 0
                                ? "Not Verified"
                                : "Verified"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {item.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end flex  gap-4 items-center justify-center   font-medium">
                            <button
                              type="button"
                              onClick={() => handleEditClick(item.id, item)}
                              className="inline-flex items-center gap-x-2 text-[20px] font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800"
                            >
                              <FaUserEdit />
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-[20px] font-semibold rounded-lg border border-transparent text-red-600 focus:outline-none  disabled:pointer-events-none "
                            >
                              <MdDelete />
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
      <div>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          userId={userid}
        />
      </div>
    </div>
  );
};

export default Users;
