import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { toast } from 'react-toastify';
import Context from '../context'; 

const AccountManagement = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState(user?.email || '');
    const { updateUserPassword, deleteUserAccount } = useContext(Context);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/api/change-email', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include' // Ensure cookies are sent with the request
                },
                body: JSON.stringify({ newEmail: email }),
            });
            const data = await response.json();
            console.log('Email Change Response:', data);
            if (data.success) {
                toast.success(data.message);
                dispatch(setUserDetails({ ...user, email }));
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error('Error updating email:', err);
            toast.error('Failed to update email.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/api/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    credentials: 'include' // Ensure cookies are sent with the request
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            const data = await response.json();
            console.log('Password Change Response:', data);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error('Error changing password:', err);
            toast.error('Failed to change password.');
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const response = await fetch('http://localhost:8080/api/delete-account', {
                    method: 'DELETE',
                    credentials: 'include', // Ensure cookies are sent with the request
                });
                const data = await response.json();
                console.log('Delete Account Response:', data);
                if (data.success) {
                    toast.success(data.message);
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    dispatch(setUserDetails(null));
                    navigate('/login');
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                console.error('Error deleting account:', err);
                toast.error('Failed to delete account.');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Account Management</h2>

            <form onSubmit={handleEmailChange} className="mb-6">
                <label className="block mb-2">
                    <span className="text-gray-700">New Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-200"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-purple-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-purple-700"
                >
                    Change Email
                </button>
            </form>

            <form onSubmit={handlePasswordChange} className="mb-6">
                <label className="block mb-2">
                    <span className="text-gray-700">Old Password:</span>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-200"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">New Password:</span>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-200"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-purple-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-purple-700"
                >
                    Change Password
                </button>
            </form>

            <button
                onClick={handleDeleteAccount}
                className="w-full py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-red-700"
            >
                Delete Account
            </button>
        </div>
    );
};

export default AccountManagement;
