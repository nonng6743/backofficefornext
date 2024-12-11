import React, { useState } from "react";

type Role = {
  id: number;
  name: string;
};

type AddUserModalProps = {
  roles: Role[];
  onClose: () => void;
  fetchUsers: () => void;
};

const AddUserModal = ({ roles, onClose, fetchUsers }: AddUserModalProps) => {
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    roleId: 0,
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchUsers();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Add New User</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              value={newUser.roleId}
              onChange={(e) =>
                setNewUser({ ...newUser, roleId: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
              required
            />
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
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
