import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-[250px,1fr] h-screen">
        {/* Sidebar - Fixed width, no scrolling */}
        <div className="text-center w-full p-4 bg-gray-900 text-white overflow-hidden">
          <Sidebar />
        </div>
        {/* Main content - Scrollable if content overflows */}
        <div className="w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
