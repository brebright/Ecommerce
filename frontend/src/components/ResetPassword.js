// ResetPassword.js


// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//     const { token } = useParams(); // Assume token is passed as a URL parameter
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setMessage('Passwords do not match!');
//             return;
//         }

//         const response = await fetch(`/api/update-password`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ token, password: newPassword }),
//         });

//         const data = await response.json();
//         setMessage(data.message);
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="password" 
//                     placeholder="New Password" 
//                     value={newPassword} 
//                     onChange={(e) => setNewPassword(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Confirm Password" 
//                     value={confirmPassword} 
//                     onChange={(e) => setConfirmPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Update Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ResetPassword;


// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const { search } = useLocation();
    const token = new URLSearchParams(search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/reset-password', { token, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
