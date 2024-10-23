import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';  // User Profile component
import Mytasks from '../Mytasks/Mytasks';                  // My Tasks component
import LoginUsers from '../LoginUsers/LoginUsers';          // Users component

const DashboardPage = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profileupdate':
                return <ProfileUpdate />;
            case 'mytasks':
                return <Mytasks />;
            case 'allusers':
                return <LoginUsers />;
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
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
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
                                        onClick={() => setActiveComponent('allusers')}
                                    >
                                        Users
                                    </button>
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
                        {renderComponent()}
                    </main>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
