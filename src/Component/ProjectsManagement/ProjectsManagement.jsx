import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../redux/Slices/projectManagementSlice';

const ProjectsManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDate, setProjectDate] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const dispatch = useDispatch();
    const projectmanagement = useSelector((state) => state?.projectManagement);
    const loading = projectmanagement?.loading;
    const error = projectmanagement?.error;
    const projects = projectmanagement?.projects;



    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setProjectName('');
            setProjectDescription('');
            setProjectDate('');
            setIsEditing(false);
            setSelectedProject(null); // Reset selectedProject when modal is closed
        }
    };

    const openEditModal = (project) => {
        setProjectName(project.name);
        setProjectDescription(project.description);
        setProjectDate(project.date);
        setSelectedProject(project); // Clone the project to avoid direct mutation
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await dispatch(updateProject({
                    projectId: selectedProject.id,
                    projectData: {
                        name: projectName,
                        description: projectDescription,
                        date: projectDate,
                        isActive: selectedProject.isActive, // Include isActive in the update
                    },
                })).unwrap();
            } else {
                await dispatch(createProject({
                    name: projectName,
                    description: projectDescription,
                    date: projectDate,
                    is_active: false, // Default isActive to false for new projects
                })).unwrap();
            }
            dispatch(fetchProjects()); // Refresh the project list
            toggleModal(); // Close the modal after saving
        } catch (error) {
            console.error("Failed to save project:", error);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await dispatch(deleteProject(projectId)).unwrap(); // Use the deleteProject thunk
            // fetchProjects will be called within the deleteProject thunk when fulfilled
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Project Management</h1>

            <section className="mb-12">
                <div className='flex justify-between mb-4'>
                    <h2 className="text-2xl font-bold">Admin</h2>
                    <button
                        onClick={toggleModal}
                        className="bg-black text-white px-4 py-2 rounded-md"
                    >
                        Create Project
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">All Projects</h3>
                    {loading ? (
                        <p className="text-gray-500">Loading projects...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Project Name</th>
                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Project Description</th>
                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Created At</th>
                                    <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="py-2 px-4 border-b border-gray-300">{project.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{project.description}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{project.created_at}</td>
                                        <td className="py-2 px-4 border-b border-gray-300 flex space-x-2">
                                            <button onClick={() => openEditModal(project)} className="text-blue-500 hover:text-blue-700 transition duration-200">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:text-red-700 transition duration-200">
                                                <FaTrashAlt />
                                            </button>
                                            <button className="text-green-500 hover:text-green-700 transition duration-200">
                                                <FaUser />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">{isEditing ? "Edit Project" : "Create Project"}</h2>
                        <form onSubmit={handleSaveProject} className="space-y-4">
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

                            {/* Toggle Switch for "is-active" */}
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={selectedProject?.isActive || false}
                                    onChange={(e) => setSelectedProject({ ...selectedProject, isActive: e.target.checked })}
                                    className="w-5 h-5 mr-2"
                                />
                                <label className="text-sm font-medium text-gray-700" htmlFor="isActive">
                                    Is Active
                                </label>
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
                                    {isEditing ? "Save Changes" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManagement;
