import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { fetchAllUsers } from '../../redux/Slices/allUsersSlice'; // Import the action

const LoginUsers = () => {
  const dispatch = useDispatch();
  const { users = [], status, error } = useSelector((state) => state.allusers); // Default users to an empty array

  const [showAddPopup, setShowAddPopup] = useState(false); // State for Add User popup
  const [showEditPopup, setShowEditPopup] = useState(false); // State for Edit User popup
  const [editUser, setEditUser] = useState(null); // State for editing a specific user

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin', // Default role is 'admin'
  });

  useEffect(() => {
    dispatch(fetchAllUsers()); // Fetch all users when component mounts
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openAddPopup = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'admin',
    });
    setShowAddPopup(true);
  };

  const openEditPopup = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Not displaying password
      role: user.role,
    });
    setEditUser(user);
    setShowEditPopup(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Button to trigger "Create New User" popup */}
      <button
        className="bg-blue-500 text-white py-2 px-4 mb-4 rounded"
        onClick={openAddPopup}
      >
        Create New User
      </button>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">All Users</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">User Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Role</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' ? (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b border-gray-300 text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      className="text-blue-500 mr-4"
                      onClick={() => openEditPopup(user)}
                    >
                      <FaEdit /> {/* Edit icon */}
                    </button>
                    <button className="text-red-500">
                      <FaTrashAlt /> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b border-gray-300 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup for creating a new user */}
      {showAddPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New User</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Create
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setShowAddPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup for editing a user */}
      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setShowEditPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginUsers;
