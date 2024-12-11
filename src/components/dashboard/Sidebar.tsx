"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaUser, FaBox, FaFileExcel, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด/ปิด Sidebar
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { label: "Users", path: "/users", icon: <FaUser /> },
    {
      label: "Product Management",
      path: "/product-management",
      icon: <FaBox />,
    },
    { label: "Excel Report", path: "/excel-report", icon: <FaFileExcel /> },
    { label: "Settings", path: "/setting", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-20 bg-[rgb(26,32,53)] text-white p-2 rounded shadow-lg ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[rgb(26,32,53)] text-white flex flex-col transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex items-center space-x-4 border-b border-gray-700">
          <span className="text-lg font-bold">MyApp</span>
        </div>
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className="w-full text-left px-4 py-2 flex items-center space-x-4 text-white hover:bg-[rgb(33,42,68)] hover:shadow-md transition-all rounded-md"
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false); // ปิด Sidebar เมื่อเลือกเมนู
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay สำหรับปิด Sidebar เมื่อคลิกข้างนอก */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
