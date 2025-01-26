
// import React, { useState } from 'react';
// import loginIcons from '../assest/signin.gif';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import imageTobase64 from '../helpers/imageTobase64';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     confirmPassword: "",
//     profilePic: "",
//   });
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [emailError, setEmailError] = useState("");
//   const [showStrengthTooltip, setShowStrengthTooltip] = useState(false);

//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "password") {
//       evaluatePasswordStrength(value);
//     }

//     if (name === "email") {
//       validateEmail(value);
//     }
//   };

//   const handleUploadPic = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageTobase64(file);
//     setData((prev) => ({
//       ...prev,
//       profilePic: imagePic,
//     }));
//   };

//   const evaluatePasswordStrength = (password) => {
//     let strength = 0;
//     const lengthCriteria = password.length >= 8 ? 1 : 0;
//     const upperCaseCriteria = /[A-Z]/.test(password) ? 1 : 0;
//     const lowerCaseCriteria = /[a-z]/.test(password) ? 1 : 0;
//     const numberCriteria = /\d/.test(password) ? 1 : 0;
//     const specialCharCriteria = /[!@#$%^&*]/.test(password) ? 1 : 0;

//     strength += lengthCriteria + upperCaseCriteria + lowerCaseCriteria + numberCriteria + specialCharCriteria;

//     setPasswordStrength((strength / 5) * 100); // Calculate percentage
//   };

//   const validateEmail = (email) => {
//     // Enhanced email regex
//     const emailRegex = /^(?![_.-])([a-zA-Z0-9._%+-]+)@(?![-.])([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(?<![-.])$/;
    
//     if (emailRegex.test(email)) {
//       setEmailError(""); // Clear error if valid
//     } else {
//       setEmailError("Invalid email format"); // Set error message if invalid
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (data.password === data.confirmPassword) {
//       if (emailError === "") { // Proceed only if there's no email error
//         const dataResponse = await fetch(SummaryApi.signUP.url, {
//           method: SummaryApi.signUP.method,
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });

//         const dataApi = await dataResponse.json();
//         if (dataApi.success) {
//           toast.success(dataApi.message);
//           navigate("/login");
//         }
//         if (dataApi.error) {
//           toast.error(dataApi.message);
//         }
//       } else {
//         toast.error(emailError); // Show email error message
//       }
//     } else {
//       toast.error("Please check password and confirm password");
//     }
//   };

//   return (
//     <section id="signup" className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg p-5 space-y-1">
//         <div className="text-center">
//           <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border-4 border-gray-200">
//             <img src={data.profilePic || loginIcons} alt="Profile" className="w-full h-full object-cover" />
//           </div>
//           <label className="text-sm text-gray-600 font-medium cursor-pointer hover:text-purple-500 transition">
//             <input type="file" className="hidden" onChange={handleUploadPic} />
//             Upload Profile
//           </label>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="grid gap-1">
//             <label className="text-sm font-semibold text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={handleOnChange}
//               placeholder="Enter your name"
//               autoComplete="off"
//               className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//               required
//             />
//           </div>

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
//             {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Email error message */}
//           </div>

//           <div className="grid gap-1 relative">
//             <label className="text-sm font-semibold text-gray-700">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={data.password}
//               onChange={handleOnChange}
//               onFocus={() => setShowStrengthTooltip(true)} // Show tooltip on focus
//               onBlur={() => setShowStrengthTooltip(false)} // Hide tooltip on blur
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

//             {showStrengthTooltip && (
//               <div className="absolute -top-10 right-0 bg-gray-800 text-white text-xs rounded px-2 py-1">
//                 Strength: {passwordStrength.toFixed(0)}%
//                 <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-green-500 transition-all duration-500"
//                     style={{ width: `${passwordStrength}%` }}
//                   ></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="grid gap-1 relative">
//             <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={data.confirmPassword}
//               onChange={handleOnChange}
//               placeholder="Confirm your password"
//               autoComplete="off"
//               className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//               required
//             />
//             <div
//               className="absolute top-9 right-4 text-xl text-gray-600 cursor-pointer hover:text-purple-500 transition"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-purple-600 hover:text-purple-700 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [showStrengthTooltip, setShowStrengthTooltip] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      evaluatePasswordStrength(value);
    }

    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    const lengthCriteria = password.length >= 8 ? 1 : 0;
    const upperCaseCriteria = /[A-Z]/.test(password) ? 1 : 0;
    const lowerCaseCriteria = /[a-z]/.test(password) ? 1 : 0;
    const numberCriteria = /\d/.test(password) ? 1 : 0;
    const specialCharCriteria = /[!@#$%^&*]/.test(password) ? 1 : 0;

    strength += lengthCriteria + upperCaseCriteria + lowerCaseCriteria + numberCriteria + specialCharCriteria;

    setPasswordStrength((strength / 5) * 100); // Calculate percentage
  };

  const validateEmail = (email) => {
    // Enhanced email regex
    const emailRegex = /^(?![_.-])([a-zA-Z0-9._%+-]+)@(?![-.])([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(?<![-.])$/;
    
    if (emailRegex.test(email)) {
      setEmailError(""); // Clear error if valid
    } else {
      setEmailError(t("invalid_email")); // Set error message if invalid (translated)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      if (emailError === "") { // Proceed only if there's no email error
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } else {
        toast.error(emailError); // Show email error message
      }
    } else {
      toast.error(t("password_mismatch")); // Translated error message for password mismatch
    }
  };

  return (
    <section id="signup" className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg p-5 space-y-1">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-2 border-4 border-gray-200">
            <img src={data.profilePic || loginIcons} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label className="text-sm text-gray-600 font-medium cursor-pointer hover:text-purple-500 transition">
            <input type="file" className="hidden" onChange={handleUploadPic} />
            {t("upload_profile")} {/* Translated upload profile text */}
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-700">{t("name")}</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder={t("enter_your_name")} // Translated placeholder
              autoComplete="off"
              className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-semibold text-gray-700">{t("email")}</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder={t("enter_your_email")} // Translated placeholder
              autoComplete="off"
              className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Email error message */}
          </div>

          <div className="grid gap-1 relative">
            <label className="text-sm font-semibold text-gray-700">{t("password")}</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              onFocus={() => setShowStrengthTooltip(true)} // Show tooltip on focus
              onBlur={() => setShowStrengthTooltip(false)} // Hide tooltip on blur
              placeholder={t("enter_your_password")} // Translated placeholder
              autoComplete="off"
              className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <div
              className="absolute top-9 right-4 text-xl text-gray-600 cursor-pointer hover:text-purple-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>

            {showStrengthTooltip && (
              <div className="absolute -top-10 right-0 bg-gray-800 text-white text-xs rounded px-2 py-1">
                {t("strength")}: {passwordStrength.toFixed(0)}% {/* Translated strength label */}
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-1 relative">
            <label className="text-sm font-semibold text-gray-700">{t("confirm_password")}</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleOnChange}
              placeholder={t("confirm_your_password")} // Translated placeholder
              autoComplete="off"
              className="w-full p-3 bg-gray-50 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <div
              className="absolute top-9 right-4 text-xl text-gray-600 cursor-pointer hover:text-purple-500 transition"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
          >
            {t("sign_up")} {/* Translated button text */}
          </button>
        </form>

        <p className="text-center text-gray-600">
          {t("already_have_account?")}{" "}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 hover:underline">
            {t("login")} {/* Translated link text */}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;



