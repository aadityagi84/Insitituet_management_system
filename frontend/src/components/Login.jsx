import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/UserContext";
import { apiData } from "../constant/utils";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiData.login, form, {
        withCredentials: true,
      });
      console.log(response.data.user);
      const token = response.data.token;
      console.log(token);
      login(token);
      localStorage.setItem("ssid", response.data.user.name);
      navigate("/users");
    } catch (err) {
      console.log("Full Error:", err);
      console.log("Error Response:", err.response);

      if (err.response?.data?.errors?.length > 0) {
        return alert(err.response.data.errors[0].msg);
      }

      if (err.response?.data?.message) {
        return alert(err.response.data.message);
      }

      alert("Something went wrong, please try again.");
    }
  };
  useEffect(() => {
    if (user) {
      return navigate("/users");
    } else {
      return navigate("/login");
    }
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login </h2>
        <input
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
