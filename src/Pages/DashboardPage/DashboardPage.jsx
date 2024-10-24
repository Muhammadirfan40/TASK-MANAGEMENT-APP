import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/loginSlice';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';
import Mytasks from '../Mytasks/Mytasks';
import LoginUsers from '../LoginUsers/LoginUsers';
import ProjectsManagement from '../../Component/ProjectsManagement/ProjectsManagement';
import { fetchAllUsers } from '../../redux/Slices/allUsersSlice';

const DashboardPage = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login); // Use optional chaining to prevent error
console.log(user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    useEffect(() => {
        dispatch(fetchAllUsers()); // Fetch all users when component mounts
    }, []);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profileupdate':
                return <ProfileUpdate />;
            case 'mytasks':
                return <Mytasks />;
            case 'projectmanagement':
                return <ProjectsManagement />;
            case 'allusers':
                return (<LoginUsers />);
            default:
                return (
                    <section className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Task Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-lg font-bold mb-2">Tasks In Progress</h4>
                                <p className="text-2xl font-bold text-black">12</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-lg font-bold mb-2">Completed Tasks</h4>
                                <p className="text-2xl font-bold text-black">28</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-lg font-bold mb-2">Upcoming Deadlines</h4>
                                <p className="text-2xl font-bold text-black">5</p>
                            </div>
                        </div>
                    </section>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="bg-black text-white w-64 flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <button
                                    className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                                    onClick={() => setActiveComponent('dashboard')}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                                    onClick={() => setActiveComponent('profileupdate')}
                                >
                                    User Profile
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                                    onClick={() => setActiveComponent('mytasks')}
                                >
                                    My Tasks
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                                    onClick={() => setActiveComponent('projectmanagement')}
                                >
                                    Project Management
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                                    onClick={() => setActiveComponent('allusers')}
                                >
                                    Users
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <div className="flex items-center gap-2">
                        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 mr-4">
                            Create Task
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">{user?.name || 'User'}</span>
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                                alt="Profile"
                            />
                        </div>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 mr-4"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                <main className="p-6 flex-1 overflow-y-auto">
                    {renderComponent()}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
