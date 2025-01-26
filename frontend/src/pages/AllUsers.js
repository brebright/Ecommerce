// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { toast } from 'react-toastify'
// import axios from 'axios';
// import moment from 'moment'
// import { MdModeEdit, MdDelete  } from "react-icons/md";
// import ChangeUserRole from '../components/ChangeUserRole';

// const AllUsers = () => {
//     const [allUser,setAllUsers] = useState([])
//     const [openUpdateRole,setOpenUpdateRole] = useState(false)
//     const [updateUserDetails,setUpdateUserDetails] = useState({
//         email : "",
//         name : "",
//         role : "",
//         _id  : ""
//     })

//     const fetchAllUsers = async() =>{
//         const fetchData = await fetch(SummaryApi.allUser.url,{
//             method : SummaryApi.allUser.method,
//             credentials : 'include'
//         })

//         const dataResponse = await fetchData.json()

//         if(dataResponse.success){
//             setAllUsers(dataResponse.data)
//         }

//         if(dataResponse.error){
//             toast.error(dataResponse.message)
//         }

//     }
//     const handleDeleteUser = async (userid) => {
//         try {
//           const response = await axios.delete(`http://localhost:8080/api/userDelete/${userid}`);
//           if (response.data.success) {
//             toast.success(response.data.message);
//             fetchAllUsers(); // Refresh user list after deletion
//           } else {
//             toast.error('Failed to delete user');
//           }
//         } catch (error) {
//           toast.error(error.response?.data?.message || 'An error occurred while deleting the user');
//         }
//       };

//     useEffect(()=>{
//         fetchAllUsers()
//     },[])

//   return (
//     <div className='bg-white pb-4'>
//         <table className='w-full userTable'>
//             <thead>
//                 <tr className='bg-blue-600 text-white'>
//                     <th>Sr.</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Created Date</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody className=''>
//                 {
//                     allUser.map((el,index) => {
//                         return(
//                             <tr>
//                                 <td>{index+1}</td>
//                                 <td>{el?.name}</td>
//                                 <td>{el?.email}</td>
//                                 <td>{el?.role}</td>
//                                 <td>{moment(el?.createdAt).format('LL')}</td>
//                                 <td>
//                                     <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
//                                     onClick={()=>{
//                                         setUpdateUserDetails(el)
//                                         setOpenUpdateRole(true)

//                                     }}
//                                     >
//                                         <MdModeEdit/>
//                                     </button>
//                                     <button 
//         className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
//         onClick={() => handleDeleteUser(el._id)} // Pass the user ID to delete function
//         title="Delete User"
//       >
//         <MdDelete />
//       </button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>

//         {
//             openUpdateRole && (
//                 <ChangeUserRole 
//                     onClose={()=>setOpenUpdateRole(false)} 
//                     name={updateUserDetails.name}
//                     email={updateUserDetails.email}
//                     role={updateUserDetails.role}
//                     userId={updateUserDetails._id}
//                     callFunc={fetchAllUsers}
//                 />
//             )      
//         }
//     </div>
//   )
// }

// export default AllUsers

import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            // Ensure the user ID is being passed correctly
            console.log("Deleting user with ID:", userId);

            const response = await axios.delete(`http://localhost:8080/api/userDelete/${userId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchAllUsers(); // Refresh user list after deletion
            } else {
                toast.error(response.data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.response?.data?.message || 'An error occurred while deleting the user');
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-blue-600 text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map((el, index) => (
                            <tr key={el._id}> {/* Ensure key is unique */}
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    {/* Edit Button */}
                                    <button
                                        className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2'
                                        onClick={() => handleDeleteUser(el._id)} // Pass the user ID to delete function
                                        title="Delete User"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
