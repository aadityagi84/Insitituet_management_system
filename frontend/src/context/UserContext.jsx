import cookie from "js-cookie";
import { createContext, useState, useEffect, useContext } from "react";
import { apiData } from "../constant/utils";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roleData, setRoleData] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = cookie.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("ssid") || null;
  });

  useEffect(() => {
    console.log("User Updated:", user);
    console.log("Role Data Updated:", roleData);
    console.log("Username Updated:", username);

    const userData = async () => {
      try {
        const response = await axios.get(apiData.verify, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        console.log(response.data);
        setRoleData(response.data.role); // Store role from backend
      } catch (error) {
        console.log("Error verifying user:", error);
      }
    };

    if (user) {
      userData();
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setUsername(userData.username);
    cookie.set("user", JSON.stringify(userData), { expires: 1 });
    localStorage.setItem("ssid", userData.username);
  };

  const logout = () => {
    setUser(null);
    setRoleData(null);
    setUsername(null);
    cookie.remove("user");
    localStorage.removeItem("ssid");
  };

  return (
    <AuthContext.Provider
      value={{ user, roleData, login, logout, setUser, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
