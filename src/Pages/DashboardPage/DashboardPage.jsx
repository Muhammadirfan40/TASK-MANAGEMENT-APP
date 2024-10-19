import React from 'react';

const DashboardPage = () => {
    return (
        <>

            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="bg-black text-white w-64 flex-shrink-0">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">My Tasks</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Teams</a>
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
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <div className="flex items-center">
                            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 mr-4">
                                Create Task
                            </button>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">John Doe</span>
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://via.placeholder.com/40"
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    </header>

                    {/* Main Dashboard Content */}
                    <main className="p-6 flex-1 overflow-y-auto">
                        {/* Task Overview */}
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Task Overview</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Task Card */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Tasks In Progress</h4>
                                    <p className="text-2xl font-bold text-black">12</p>
                                </div>
                                {/* Completed Tasks */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Completed Tasks</h4>
                                    <p className="text-2xl font-bold text-black">28</p>
                                </div>
                                {/* Upcoming Deadlines */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h4 className="text-lg font-bold mb-2">Upcoming Deadlines</h4>
                                    <p className="text-2xl font-bold text-black">5</p>
                                </div>
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
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example Task Row */}
                                        <tr>
                                            <td className="border-t px-4 py-2">Design Homepage</td>
                                            <td className="border-t px-4 py-2">Oct 25, 2024</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">In Progress</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                        {/* Additional Task Rows */}
                                        <tr>
                                            <td className="border-t px-4 py-2">Fix Bug #1234</td>
                                            <td className="border-t px-4 py-2">Oct 20, 2024</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-t px-4 py-2">Prepare Meeting Slides</td>
                                            <td className="border-t px-4 py-2">Oct 30, 2024</td>
                                            <td className="border-t px-4 py-2">
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">Overdue</span>
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit</button>
                                            </td>
                                        </tr>
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

export default DashboardPage
