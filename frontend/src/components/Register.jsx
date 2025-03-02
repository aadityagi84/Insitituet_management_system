import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiData } from "../constant/utils";
import toast, { Toaster } from "react-hot-toast";
import RegisterBanner from "../assets/register-banner.png";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiData.register, form);
      console.log(response);

      // Show success toast
      toast.success("Registration successful! Redirecting to login...");

      // Navigate after a short delay to ensure the user sees the toast
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Delay of 1 second to show the toast
    } catch (err) {
      console.log(err.response.data.errors[0].msg);

      // Show error toast
      toast.error(err.response.data.message || err.response.data.errors[0].msg);
    }
  };

  return (
    <div className="grid lg:grid-cols-[60%,1fr] h-screen">
      {/* Left Side (Unique Illustration with Pattern) */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 lg:flex items-center justify-center relative  hidden overflow-hidden">
        <div className="relative flex items-center  justify-center  ">
          {/* Unique Illustration with Pattern */}
          <img
            src={RegisterBanner}
            className="w-[60%] object-cover"
            alt="Register Banner"
          />

          {/* Decorative Elements (Stars and Circles for uniqueness) */}
          <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-purple-300 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-blue-200 rounded-full"></div>
        </div>
      </div>

      {/* Right Side (Register Form) */}
      <div className="bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Join sneat! 🌟
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Create your account to embark on your sneat journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="ddress"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your Address"
              />
            </div>
            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              Register
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
