import React, { useState } from 'react';
import Backgroundimg from '../../Component/Backgroundimg/Backgroundimg';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',   // Changed firstName + lastName to single 'name' field
        email: '',
        password: ''
    });

    const [allFieldsFilled, setAllFieldsFilled] = useState(true);

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (Object.values(formData).some((field) => field === '')) {
            setAllFieldsFilled(false);
            return;
        } else {
            setAllFieldsFilled(true);
            // Submit form logic here (e.g., API call)
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="relative min-h-screen">
            <Backgroundimg />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-black mb-8">Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${!allFieldsFilled && !formData.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${!allFieldsFilled && !formData.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${!allFieldsFilled && !formData.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Display error if not all fields are filled */}
                    {!allFieldsFilled && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            Please fill in all fields
                        </p>
                    )}

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/" className="text-black font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
