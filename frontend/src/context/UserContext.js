// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import SummaryApi from '../common';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]);

//   // Fetch user details from the API
//   const fetchUserDetails = async () => {
//     try {
//       const response = await fetch(SummaryApi.current_user.url, {
//         method: SummaryApi.current_user.method,
//         credentials: 'include',
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setUser(data.user);
//         return { success: true, data: data.user }; // Return user data
//       } else {
//         toast.error(data.message || 'Failed to fetch user details.');
//         return { success: false }; // Return failure
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       toast.error("Failed to fetch user details.");
//       return { success: false }; // Return failure
//     }
//   };

//   // Fetch user's cart from the API
//   const fetchUserAddToCart = async () => {
//     try {
//       const response = await fetch(SummaryApi.addToCartProductCount.url, {
//         method: SummaryApi.addToCartProductCount.method,
//         credentials: 'include',
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setCart(data.cart || []);
//         return { success: true, data: data.cart || [] }; // Return cart data
//       } else {
//         toast.error(data.message || 'Failed to fetch cart.');
//         return { success: false }; // Return failure
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       toast.error("Failed to fetch cart.");
//       return { success: false }; // Return failure
//     }
//   };

//   // Update user cart
//   const updateCart = (item) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map(cartItem => 
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCart((prevCart) => prevCart.filter(cartItem => cartItem.id !== itemId));
//   };

//   // Clear the cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // Effect to fetch user details and cart when the provider mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchUserDetails();
//       await fetchUserAddToCart();
//     };
//     fetchData();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         cart,
//         fetchUserDetails,
//         fetchUserAddToCart,
//         updateCart,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook for using the UserContext
// export const useUserContext = () => {
//   return useContext(UserContext);
// };

// // Default export for UserProvider
// export default UserContext;
