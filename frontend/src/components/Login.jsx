import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/UserContext";
import { apiData } from "../constant/utils";
import axios from "axios";
import LoginBanner from "../assets/login-banner.png";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const Login = () => {
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

      // Show success toast
      toast.success("Login successful! Redirecting...");

      // Navigate after a short delay to ensure the user sees the toast
      setTimeout(() => {
        navigate("/");
      }, 1000); // Delay of 1 second to show the toast
    } catch (err) {
      console.log("Full Error:", err);
      console.log("Error Response:", err.response);

      if (err.response?.data?.errors?.length > 0) {
        // Show error toast for validation errors
        toast.error(err.response.data.errors[0].msg);
      } else if (err.response?.data?.message) {
        // Show error toast for general messages
        toast.error(err.response.data.message);
      } else {
        // Show generic error toast
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      return navigate("/");
    } else {
      return navigate("/login");
    }
  }, [user]);

  return (
    <div className="grid lg:grid-cols-[60%,1fr] h-screen">
      <div className="bg-gray-100 lg:flex items-center justify-center hidden ">
        <div className="relative  flex justify-center  ">
          {/* Illustration */}
          <img
            src={LoginBanner}
            className="w-[60%] object-cover "
            alt="Login Banner"
          />
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to sneat! 👋
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign-in to your account and start the adventure
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email or username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <span className="absolute right-3 top-2 text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Login
            </button>

            {/* Create Account Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                New on our platform?{" "}
                <Link
                  to="/register"
                  className="text-purple-600 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
