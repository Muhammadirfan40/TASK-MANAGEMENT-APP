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
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

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
                      <FaEdit />
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteUser(user.id)}>
                      <FaTrashAlt />
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
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleCreateUser}
            >
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
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleEditUser}
            >
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

export default UserManagement;
