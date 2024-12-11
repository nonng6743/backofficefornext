import React, { useState, useEffect } from "react";

type User = {
  id: number;
  email: string;
  roleId: number;
  fullName: string;
  status: string;
};

type Role = {
  id: number;
  name: string;
};

type EditUserModalProps = {
  user: User;
  roles: Role[];
  onClose: () => void;
  fetchUsers: () => void;
};

const EditUserModal = ({
  user,
  roles,
  onClose,
  fetchUsers,
}: EditUserModalProps) => {
  const [editUser, setEditUser] = useState<User>(user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditUser(user); // Sync user data when modal is opened
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Retrieve the JWT token

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const data = {
        fullName: editUser.fullName,
        email: editUser.email,
        roleId: editUser.roleId,
        status: editUser.status,
      };

      console.log("Edit User Data:", JSON.stringify(data, null, 2));

      const response = await fetch(`/api/users/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchUsers(); // Reload user list
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Edit User</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={editUser.fullName}
              onChange={(e) =>
                setEditUser({ ...editUser, fullName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={editUser.roleId}
              onChange={(e) =>
                setEditUser({ ...editUser, roleId: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={editUser.status}
              onChange={(e) =>
                setEditUser({ ...editUser, status: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
