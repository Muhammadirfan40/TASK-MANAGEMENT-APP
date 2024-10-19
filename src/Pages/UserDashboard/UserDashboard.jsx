import React from 'react'

const UserDashboard = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="bg-black text-white w-64 flex-shrink-0">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">My Projects</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">My Tasks</a>
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
                        <h2 className="text-2xl font-bold">User Dashboard</h2>
                        <div className="flex items-center">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">John Doe</span>
                                <img className="h-10 w-10 rounded-full object-cover" src="https://via.placeholder.com/40" alt="Profile" />
                            </div>
                        </div>
                    </header>

                    {/* Main Dashboard Content */}
                    <main className="p-6 flex-1 overflow-y-auto">
                        {/* Assigned Projects */}
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Assigned Projects</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Example Project */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Project Alpha</h4>
                                    <p className="text-gray-600 mb-4">Due Date: <span className="font-semibold">Oct 30, 2024</span></p>
                                    <a href="#" className="text-blue-500 hover:underline">View Tasks</a>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Project Beta</h4>
                                    <p className="text-gray-600 mb-4">Due Date: <span className="font-semibold">Nov 15, 2024</span></p>
                                    <a href="#" className="text-blue-500 hover:underline">View Tasks</a>
                                </div>
                                {/* Additional Projects can be listed similarly */}
                            </div>
                        </section>

                        {/* Task List */}
                        <section>
                            <h3 className="text-xl font-bold mb-4">My Tasks</h3>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Task</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Due Date</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example Task Row */}
                                        <tr>
                                            <td className="border-t px-4 py-2">Complete UI Design</td>
                                            <td className="border-t px-4 py-2">Oct 22, 2024</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">In Progress</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border-t px-4 py-2">Fix Bug #234</td>
                                            <td className="border-t px-4 py-2">Oct 25, 2024</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Additional Tasks */}
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

export default UserDashboard
