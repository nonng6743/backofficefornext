"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaHome, FaUser, FaBox, FaFileExcel, FaCog, FaChevronDown } from "react-icons/fa";

// ประเภทของเมนู
type SubMenuItem = {
  label: string;
  path: string;
  action?: () => void;
};

type MenuItem = {
  label: string;
  path?: string;
  icon: React.ReactNode;
  action?: () => void;
  subItems?: SubMenuItem[];
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด/ปิด Sidebar
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State สำหรับเปิด/ปิดเมนูย่อย
  const router = useRouter();
  const pathname = usePathname(); // ดึง URL ปัจจุบัน

  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { label: "Users", path: "/users", icon: <FaUser /> },
    {
      label: "Product Management",
      path: "/product-management",
      icon: <FaBox />,
    },
    { label: "Excel Report", path: "/excel-report", icon: <FaFileExcel /> },
    {
      label: "Settings",
      icon: <FaCog />,
      subItems: [
        { label: "Profile Settings", path: "/settings/profile" },
        { label: "Account Settings", path: "/settings/account" },
      ],
    },
    
  ];

  const handleItemClick = (item: MenuItem | SubMenuItem) => {
    if (item.action) {
      item.action(); // เรียกใช้งาน action ถ้ามี
    }
    if (item.path) {
      router.push(item.path); // นำทางไปยัง path ถ้ามี
    }
    setIsOpen(false); // ปิด Sidebar หลังเลือก
  };

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
                {item.subItems ? (
                  <>
                    <button
                      className={`w-full text-left px-4 py-2 flex items-center space-x-4 hover:bg-[rgb(33,42,68)] hover:shadow-md transition-all rounded-md ${
                        pathname.startsWith("/settings") ? "bg-[rgb(33,42,68)]" : ""
                      }`}
                      onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={`ml-auto transition-transform ${
                          isSettingsOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isSettingsOpen && (
                      <ul className="ml-8 mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-[rgb(33,42,68)] hover:shadow-md transition-all rounded-md ${
                                pathname === subItem.path ? "bg-[rgb(33,42,68)]" : ""
                              }`}
                              onClick={() => handleItemClick(subItem)}
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    className={`w-full text-left px-4 py-2 flex items-center space-x-4 hover:bg-[rgb(33,42,68)] hover:shadow-md transition-all rounded-md ${
                      pathname === item.path ? "bg-[rgb(33,42,68)]" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )}
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
