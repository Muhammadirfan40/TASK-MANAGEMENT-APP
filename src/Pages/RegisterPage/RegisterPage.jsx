import React, { useState } from 'react';
import Backgroundimg from '../../Component/Backgroundimg/Backgroundimg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../redux/Slices/registerSlice'; // Adjust the import path as necessary

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.register);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [allFieldsFilled, setAllFieldsFilled] = useState(true);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(formData).some((field) => field === '')) {
            setAllFieldsFilled(false);
            return;
        } else {
            setAllFieldsFilled(true);
            dispatch(registerUser(formData))
                .unwrap()
                .then(() => {
                    navigate('/'); // Redirect to login or dashboard after successful registration
                })
                .catch(() => {
                    // Handle the error state here if needed
                });
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
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Display error if not all fields are filled or if there's an error */}
                    {!allFieldsFilled && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            Please fill in all fields
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            {error}
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
