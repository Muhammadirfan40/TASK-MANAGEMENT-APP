import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Backgroundimg from '../../Component/Backgroundimg/Backgroundimg';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <Backgroundimg />
            <div className="flex items-center justify-center min-h-screen absolute inset-0 bg-gray-100 bg-opacity-0">
                <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-black mb-8">Login</h2>

                    <form>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-black font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input with Eye Toggle */}
                        <div className="mb-4 relative">
                            <label className="block text-black font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.896 2.378-2.719 4.237-5.042 5.346M15 12a9.035 9.035 0 005.042-5.346M9.958 7.654C8.635 6.6 7.217 6 5.758 6m7.744 0h.018"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.98 8.034a9.965 9.965 0 00-.784 2.714C3.196 12.74 4.713 15.5 8 16.933c1.162.563 2.414.836 3.637.72M10 12c-.884 0-1.715-.345-2.343-.9m1.382 1.596a4.5 4.5 0 004.416 0M19.845 7.518a9.967 9.967 0 00-1.162-1.716M15 12c.884 0 1.715.345 2.343.9M19 12c0-2.761-1.791-5.197-4.465-6.078m-9.07 0A9.97 9.97 0 014.1 9.572"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right mb-6">
                            <a href="#" className="text-sm text-gray-600 hover:text-black">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                        >
                            Login
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/registerpage" className="text-black font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
