"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State สำหรับควบคุมเมนู Dropdown
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow px-6 h-16  flex items-center justify-end">
      {/* User Info */}
      <div className="relative">
        <div
          className="text-sm text-black cursor-pointer flex items-center space-x-2"
          onClick={toggleDropdown}
        >
          <span className="font-medium">non admin</span>
          <button className="text-gray-500 text-xs hover:text-gray-700 transition">
            ▼
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-700 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
