
// import React, { useContext, useState } from 'react';
// import loginIcons from '../assest/signin.gif';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import Context from '../context';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   });
//   const navigate = useNavigate();
//   const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataResponse = await fetch(SummaryApi.signIn.url, {
//       method: SummaryApi.signIn.method,
//       credentials: 'include',
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const dataApi = await dataResponse.json();

//     if (dataApi.success) {
//       toast.success(dataApi.message);
//       navigate('/');
//       fetchUserDetails();
//       fetchUserAddToCart();
//     } else if (dataApi.error) {
//       toast.error(dataApi.message);
//     }
//   };

//   return (
//     <section id="login" className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md p-6 space-y-6">
//         <div className="text-center">
//           <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-200">
//             <img src={loginIcons} alt="Login" className="w-full h-full object-cover text-purple-600" />
//           </div>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label className="text-sm font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleOnChange}
//               placeholder="Enter your email"
//               autoComplete="off"
//               className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//               required
//             />
//           </div>

//           <div className="grid gap-1 relative">
//             <label className="text-sm font-semibold text-gray-700">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={data.password}
//               onChange={handleOnChange}
//               placeholder="Enter your password"
//               autoComplete="off"
//               className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//               required
//             />
//             <div
//               className="absolute top-9 right-4 text-xl text-gray-600 cursor-pointer hover:text-purple-500 transition"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           <Link
//             to="/forgot-password"
//             className="block w-fit ml-auto text-sm text-purple-600 hover:text-purple-700 hover:underline transition"
//           >
//             Forgot password?
//           </Link>

//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/sign-up" className="text-purple-600 hover:text-purple-700 hover:underline transition">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Login;


import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { setUserDetails } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Signin = () => {
     const { t } = useTranslation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchUserDetails = async () => {
        const response = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: 'include',
        });
        const userData = await response.json();

        if (userData.success) {
            dispatch(setUserDetails(userData.user));
        } else {
            console.error("Failed to fetch user details:", userData.message);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                await fetchUserDetails();
                await fetchUserAddToCart();
                navigate('/'); 
            } else {
                toast.error(dataApi.message); 
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            toast.error("An error occurred during sign-in. Please try again.");
        }
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>{t("email")}: </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder={t("email")}
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label>{t("Password")}: </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("password")}
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    required
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                            {t("forgotPassword?")}
                            </Link>
                        </div>

                        <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                        {t("login")}
                        </button>
                    </form>

                    <p className='my-5'>{t("NoAccount")}? <Link to={"/sign-up"} className='text-purple-600 hover:text-purple-700 hover:underline'>{t("Sign Up")}</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Signin;

