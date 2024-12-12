"use client";

import React, { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

type User = {
  id: number;
  email: string;
  role: string;
  roleId: number;
  fullName: string;
  status: string;
};

type Role = {
  id: number;
  name: string;
};

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/list");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles/list");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the JWT token

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update the state to remove the user
        console.log("User deleted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        alert(errorData.error || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-full w-full bg-white shadow-md rounded-lg p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-700">User Management</h1>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, role, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
              >
                <td className="py-3 px-6">{indexOfFirstUser + index + 1}</td>
                <td className="py-3 px-6">{user.fullName}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">{user.status}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-900 text-white font-bold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal
          roles={roles}
          onClose={() => setIsAddUserModalOpen(false)}
          fetchUsers={fetchUsers}
        />
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && editUser && (
        <EditUserModal
          user={editUser} // Pass the user to be edited
          roles={roles} // Pass available roles
          onClose={() => {
            setIsEditUserModalOpen(false); // Close the modal
            setEditUser(null); // Reset the selected user after closing
          }}
          fetchUsers={fetchUsers} // Fetch the user list after editing
        />
      )}
    </div>
  );
};

export default UserTable;
