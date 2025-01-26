// RequestReset.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RequestReset = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/request-password-reset', { email });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Request Password Reset</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default RequestReset;
