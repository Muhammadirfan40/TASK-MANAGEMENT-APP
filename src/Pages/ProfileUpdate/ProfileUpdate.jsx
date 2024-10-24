import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/Slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Memoize the user data to avoid unnecessary re-renders
    const user = useSelector((state) => state.login?.user);
    const memoizedUser = useMemo(() => user, [user]);

    const [name, setName] = useState(memoizedUser?.name || '');
    const [email, setEmail] = useState(memoizedUser?.email || '');
    const [password, setPassword] = useState('');

    // Avoid infinite re-render by only updating state when memoized user data changes
    useEffect(() => {
        if (memoizedUser) {
            setName(memoizedUser.name || '');
            setEmail(memoizedUser.email || '');
        }
    }, [memoizedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare profile update payload
        const updatedProfile = {
            name,
            email,
            password,
        };

        // Dispatch the updateProfile action with the form data
        dispatch(updateProfile(updatedProfile)).then(() => {
            navigate('/dashboard'); // Navigate to dashboard on success
        });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>
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
