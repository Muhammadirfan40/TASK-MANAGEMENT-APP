import React, { useState } from 'react';
import Backgroundimg from '../../Component/Backgroundimg/Backgroundimg';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordError, setPasswordError] = useState(false);
    const [allFieldsFilled, setAllFieldsFilled] = useState(true);

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Check if passwords match
        if (id === 'password' || id === 'confirmPassword') {
            setPasswordError(formData.password !== formData.confirmPassword);
        }
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
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
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
                        {/* First Name Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${!allFieldsFilled && !formData.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Enter your first name"
                            />
                        </div>

                        {/* Last Name Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${!allFieldsFilled && !formData.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Enter your last name"
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

                        {/* Confirm Password Input */}
                        <div className="mb-4 relative">
                            <label className="block text-black font-medium mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black`}
                                placeholder="Confirm your password"
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                            )}
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
}

export default RegisterPage;
