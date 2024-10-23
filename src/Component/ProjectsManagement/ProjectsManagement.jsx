import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing FontAwesome icons

const ProjectsManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDate, setProjectDate] = useState(''); // Added state for project creation date

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
        // Add functionality to create a project here
        console.log({ projectName, projectDescription, projectDate });
        toggleModal(); // Close the modal after creation
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Project Management</h1>

            {/* Admin Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Admin</h2>

                {/* Create Project */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Create Project</h3>
                    <button
                        onClick={toggleModal}
                        className="bg-black text-white px-4 py-2 rounded-md"
                    >
                        Create Project
                    </button>
                </div>

                {/* View all projects */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">All Projects</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300">Project Name</th>
                                <th className="py-2 px-4 border-b border-gray-300">Project Description</th>
                                <th className="py-2 px-4 border-b border-gray-300">Created At</th> {/* Added column for Date */}
                                <th className="py-2 px-4 border-b border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample data, replace with dynamic project list */}
                            <tr>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>Project 11</p>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>lo</p>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>12-02-24</p> {/* Sample date */}
                                </td>
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
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>Project 2</p>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>Description for project 2</p>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <p>12-02-24</p> {/* Sample date */}
                                </td>
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
            </section>

            {/* Modal for Creating Project */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="projectName">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="projectDescription">
                                    Project Description
                                </label>
                                <textarea
                                    id="projectDescription"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            {/* Input for Project Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="projectDate">
                                    Project Date
                                </label>
                                <input
                                    type="date"
                                    id="projectDate"
                                    value={projectDate}
                                    onChange={(e) => setProjectDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* User Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">User</h2>

                {/* View assigned projects */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Assigned Projects</h3>
                    <ul className="space-y-4">
                        <li className="bg-white p-4 rounded shadow">
                            <span className="font-semibold">Assigned Project 1</span>
                        </li>
                        <li className="bg-white p-4 rounded shadow">
                            <span className="font-semibold">Assigned Project 2</span>
                        </li>
                    </ul>
                </div>

                {/* View tasks within assigned projects */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Tasks Within Projects</h3>
                    <ul className="space-y-4">
                        <li className="bg-white p-4 rounded shadow">
                            <span className="font-semibold">Task 1 in Project 1</span>
                        </li>
                        <li className="bg-white p-4 rounded shadow">
                            <span className="font-semibold">Task 2 in Project 1</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default ProjectsManagement;
