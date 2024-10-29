import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, fetchUserProfile } from '../../redux/Slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state) => state.profile);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fetch user profile data when the component mounts
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    // Update state when user data is fetched
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProfile = {
            name,
            email,
            password,
        };

        dispatch(updateProfile(updatedProfile)).then(() => {
            navigate('/dashboard'); // Navigate to dashboard on success
        });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-black focus:border-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-black focus:border-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-black focus:border-black"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-900"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileUpdate;
