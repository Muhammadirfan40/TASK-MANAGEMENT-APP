import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { fetchAllUsers, createUser, editUser, deleteUser } from '../../redux/Slices/allUsersSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users = [], status, error } = useSelector((state) => state.allusers);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    is_active: false, // Add this line
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
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
      password: '', // Password should not be pre-filled for security
      role: user.role,
      is_active: user.is_active, // Add this line
    });
    setEditUserId(user.id); // Store the user's ID for editing
    setShowEditPopup(true);
  };

  const handleCreateUser = () => {
    dispatch(createUser(formData))
      .unwrap()
      .then(() => {
        setShowAddPopup(false);
        dispatch(fetchAllUsers()); // Refresh user list after adding
      })
      .catch((error) => {
        console.error('Failed to create user:', error);
      });
  };

  const handleEditUser = () => {
    dispatch(editUser({ userId: editUserId, updatedUserData: formData }))
      .unwrap()
      .then(() => {
        setShowEditPopup(false);
        dispatch(fetchAllUsers()); // Refresh user list after editing
      })
      .catch((error) => {
        console.error('Failed to edit user:', error);
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
        .unwrap()
        .then(() => {
          dispatch(fetchAllUsers()); // Refresh user list after deleting
        })
        .catch((error) => {
          console.error('Failed to delete user:', error);
        });
    }
  };

  return (

    <div className="p-8">

      <div className='flex justify-between'>

        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        <button
          className="bg-blue-500 text-white py-2 px-4 mb-4 rounded"
          onClick={openAddPopup}
        >
          Create New User
        </button>

      </div>

      {/* All users table */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">User Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Email</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Role</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500 border-b">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 border-b border-gray-300">{user.name}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{user.role}</td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-4 transition-colors duration-200"
                      onClick={() => openEditPopup(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500 border-b">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New User</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleCreateUser}
              >
                Create
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                onClick={() => setShowAddPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for editing a user */}
      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-600">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleEditUser}
              >
                Update
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                onClick={() => setShowEditPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>

  );

};

export default UserManagement;
