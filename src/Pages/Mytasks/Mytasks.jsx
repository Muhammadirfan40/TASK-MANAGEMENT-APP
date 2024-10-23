import React from 'react'

function Mytasks() {
    return (
        <>
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
        </>
    )
}

export default Mytasks