import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Adjusted import

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get current user data from Redux store
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
        navigate('/dashboard');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggle the visibility state
    };

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring focus:ring-gray-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring focus:ring-gray-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring focus:ring-gray-400 focus:outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform  focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-600" />
                            )}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdate;
