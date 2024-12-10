"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // ลบ Token ออกจาก Local Storage
    localStorage.removeItem("token");

    // เปลี่ยนเส้นทางไปหน้า Login
    router.push("/login");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      <p className="text-black">Welcome to your dashboard!</p>
      {/* เพิ่มเนื้อหาเพิ่มเติมที่นี่ */}
    </div>
  );
};

export default Dashboard;
