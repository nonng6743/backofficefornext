import React from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import AuthCheck from "@/components/dashboard/AuthCheck";

const DashboardPage = () => {
  return (
    <AuthCheck>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-none bg-[rgb(26,32,53)] text-white md:w-64 w-20 transition-all duration-300">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Navbar */}
          <Navbar />

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 flex flex-col items-center sm:items-start ">
            <DashboardContent />
          </main>
        </div>
      </div>
    </AuthCheck>
  );
};

export default DashboardPage;
