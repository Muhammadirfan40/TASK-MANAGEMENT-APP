import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing FontAwesome icons

const LoginUsers = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
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
            {/* Sample data, replace with dynamic user list */}
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">John Doe</td>
              <td className="py-2 px-4 border-b border-gray-300">john@example.com</td>
              <td className="py-2 px-4 border-b border-gray-300">Admin</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button className="text-blue-500 mr-4">
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button className="text-red-500">
                  <FaTrashAlt /> {/* Delete icon */}
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">Jane Smith</td>
              <td className="py-2 px-4 border-b border-gray-300">jane@example.com</td>
              <td className="py-2 px-4 border-b border-gray-300">User</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button className="text-blue-500 mr-4">
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button className="text-red-500">
                  <FaTrashAlt /> {/* Delete icon */}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginUsers;
