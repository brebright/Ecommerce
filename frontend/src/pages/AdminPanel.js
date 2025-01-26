// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Ensure the correct icons are imported
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import ROLE from '../common/role';

// const AdminPanel = () => {
//     const user = useSelector(state => state?.user?.user);
//     const navigate = useNavigate();
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

//     useEffect(() => {
//         if (user?.role !== ROLE.ADMIN) {
//             navigate("/");
//         }
//     }, [user, navigate]);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(prev => !prev); // Toggle sidebar visibility
//     };

//     return (
//         <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row relative'>

//             {/* Toggle Button and Search Bar for Small Devices */}
//             <div className="flex items-center justify-between w-full p-2 md:hidden -z-10 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
//                 <button 
//                     onClick={toggleSidebar} 
//                     className="p-2 text-xl hover:bg-gray-200 rounded transition-colors duration-200"
//                     aria-label="Toggle sidebar" // Accessibility improvement
//                 >
//                     {isSidebarOpen ? <FaTimes /> : <FaBars />} {/* Show different icons based on sidebar state */}
//                 </button>

//                 <input 
//                     type="text" 
//                     placeholder="Search..." 
//                     className="w-[70%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" 
//                 />
//             </div>

//            {/* Admin Sidebar */}
// <aside className={`bg-white w-full md:w-[25%] customShadow rounded-lg shadow-lg ${isSidebarOpen ? 'block' : 'hidden md:block'} transition-all duration-300 ease-in-out`}>
//     <div className='h-32 flex flex-col justify-center items-center border-b border-gray-300'>
//         <div className='text-5xl cursor-pointer relative flex justify-center'>
//             {
//                 user?.profilePic ? (
//                     <img src={user?.profilePic} className='w-20 h-20 rounded-full border-2 border-blue-500 shadow-md' alt={user?.name} />
//                 ) : (
//                     <FaUserCircle className='text-blue-500' /> // Use FaUserCircle instead of FaRegCircleUser
//                 )
//             }
//         </div>
//         <p className='capitalize text-lg font-semibold mt-2'>{user?.name}</p>
//         <h2  className = "text-lg text-purple-500 font-bold">Well come</h2>
//         <p className='text-sm text-gray-600'>{user?.role}</p>
//     </div>

//     {/* Navigation */}
//     <div className='p-4'>
//         <nav className='grid gap-4'>
//             <Link 
//                 to={"all-users"} 
//                 className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                 onClick={() => setIsSidebarOpen(false)}>
//                 All Users
//             </Link>
//             <Link 
//                 to={"all-products"} 
//                 className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                 onClick={() => setIsSidebarOpen(false)}>
//                 All Products
//             </Link>
//             <Link 
//                 to={"all-orders"} 
//                 className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                 onClick={() => setIsSidebarOpen(false)}>
//               All Orders
//             </Link>
//         </nav>
//     </div>
// </aside>
//             <main className='w-full h-full p-2 mt-4 md:mt-0'>
//                 <Outlet />
//             </main>
//         </div>
//     );
// }

// export default AdminPanel;



import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    const toggleSidebar = () => {
        console.log('Toggling sidebar'); // Check if the function is called
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row relative'>
            {/* Toggle Button and Search Bar for Small Devices */}
            <div className="flex items-center justify-between w-full p-2 md:hidden -z-10 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 text-xl hover:bg-gray-200 rounded transition-colors duration-200"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>

                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-[70%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" 
                />
            </div>

            {/* Admin Sidebar */}
            <aside className={`bg-white w-full md:w-[25%] customShadow rounded-lg shadow-lg ${isSidebarOpen ? 'block' : 'hidden md:block'} transition-all duration-300 ease-in-out`}>
                <div className='h-32 flex flex-col justify-center items-center border-b border-gray-300'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full border-2 border-blue-500 shadow-md' alt={user?.name} />
                        ) : (
                            <FaUserCircle className='text-blue-500' />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold mt-2'>{user?.name}</p>
                    <h2 className="text-lg text-purple-500 font-bold">Welcome</h2>
                    <p className='text-sm text-gray-600'>{user?.role}</p>
                </div>

                {/* Navigation */}
                <div className='p-4'>
                    <nav className='grid gap-4'>
                        <Link 
                            to={"all-users"} 
                            className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            All Users
                        </Link>
                        <Link 
                            to={"all-products"} 
                            className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            All Products
                        </Link>
                        <Link 
                            to={"all-orders"} 
                            className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            All Orders
                        </Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2 mt-4 md:mt-0'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;










// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import ROLE from '../common/role';

// const AdminPanel = () => {
//     const user = useSelector(state => state?.user?.user);
//     const navigate = useNavigate();
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     useEffect(() => {
//         if (user?.role !== ROLE.ADMIN) {
//             navigate("/");
//         }
//     }, [user, navigate]);

//     const toggleSidebar = () => {
//         console.log('Toggling sidebar'); // Check if the function is called
//         setIsSidebarOpen(prev => !prev);
//     };

//     return (
//         <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row relative'>
//             {/* Toggle Button and Search Bar for Small Devices */}
//             <div className="flex items-center justify-between w-full p-2 md:hidden -z-10 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
//                 <button 
//                     onClick={toggleSidebar} 
//                     className="p-2 text-xl hover:bg-gray-200 rounded transition-colors duration-200"
//                     aria-label="Toggle sidebar"
//                 >
//                     {isSidebarOpen ? <FaTimes /> : <FaBars />} {/* Show different icons based on sidebar state */}
//                 </button>

//                 <input 
//                     type="text" 
//                     placeholder="Search..." 
//                     className="w-[70%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" 
//                 />
//             </div>

//             {/* Admin Sidebar */}
//             <aside className={`bg-white w-full md:w-[25%] customShadow rounded-lg shadow-lg ${isSidebarOpen ? 'block' : 'hidden md:block'} transition-all duration-300 ease-in-out`}>
//                 <div className='h-32 flex flex-col justify-center items-center border-b border-gray-300'>
//                     <div className='text-5xl cursor-pointer relative flex justify-center'>
//                         {
//                             user?.profilePic ? (
//                                 <img src={user?.profilePic} className='w-20 h-20 rounded-full border-2 border-blue-500 shadow-md' alt={user?.name} />
//                             ) : (
//                                 <FaUserCircle className='text-blue-500' />
//                             )
//                         }
//                     </div>
//                     <p className='capitalize text-lg font-semibold mt-2'>{user?.name}</p>
//                     <h2 className="text-lg text-purple-500 font-bold">Welcome</h2>
//                     <p className='text-sm text-gray-600'>{user?.role}</p>
//                 </div>

//                 {/* Navigation */}
//                 <div className='p-4'>
//                     <nav className='grid gap-4'>
//                         <Link 
//                             to={"all-users"} 
//                             className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                             onClick={() => setIsSidebarOpen(false)}
//                         >
//                             All Users
//                         </Link>
//                         <Link 
//                             to={"all-products"} 
//                             className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                             onClick={() => setIsSidebarOpen(false)}
//                         >
//                             All Products
//                         </Link>
//                         <Link 
//                             to={"all-orders"} 
//                             className='block px-4 py-2 text-center text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 rounded-lg shadow-sm' 
//                             onClick={() => setIsSidebarOpen(false)}
//                         >
//                             All Orders
//                         </Link>
//                     </nav>
//                 </div>
//             </aside>

//             <main className='w-full h-full p-2 mt-4 md:mt-0'>
//                 <Outlet />
//             </main>
//         </div>
//     );
// }

// export default AdminPanel;
