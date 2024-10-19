import React from 'react';

const AdminDashboard = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="bg-black text-white w-64 flex-shrink-0">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Projects</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Users</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white shadow p-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                        <div className="flex items-center">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Admin User</span>
                                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/40" alt="Profile" />
                            </div>
                        </div>
                    </header>

                    {/* Main Dashboard Content */}
                    <main className="p-6 flex-1 overflow-y-auto">
                        {/* Project Management Section */}
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Project Management</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Project Cards */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Total Projects</h4>
                                    <p className="text-2xl font-bold text-black">50</p>
                                    <a href="#" className="text-blue-500 hover:underline">Manage Projects</a>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Assigned Projects</h4>
                                    <p className="text-2xl font-bold text-black">20</p>
                                    <a href="#" className="text-blue-500 hover:underline">View Assigned</a>
                                </div>

                            </div>
                        </section>

                        {/* User Management Section */}
                        <section>
                            <h3 className="text-xl font-bold mb-4">User Management</h3>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">User</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example User Row */}
                                        <tr>
                                            <td className="border-t px-4 py-2">John Doe</td>
                                            <td className="border-t px-4 py-2">Admin</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Active</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Additional Users */}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
