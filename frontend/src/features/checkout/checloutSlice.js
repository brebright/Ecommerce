// import { createSlice } from '@reduxjs/toolkit';

// const checkoutSlice = createSlice({
//   name: 'checkout',
//   initialState: {
//     checkoutItems: [],
//     totalAmount: 0,
//     shippingAddress: {},
//     paymentMethod: '',
//   },
//   reducers: {
//     addCheckoutItem(state, action) {
//       state.checkoutItems.push(action.payload);
//       state.totalAmount += action.payload.price; // Adjust based on your pricing structure
//     },
//     removeCheckoutItem(state, action) {
//       const itemToRemove = state.checkoutItems.find(item => item.id === action.payload);
//       if (itemToRemove) {
//         state.totalAmount -= itemToRemove.price;
//         state.checkoutItems = state.checkoutItems.filter(item => item.id !== action.payload);
//       }
//     },
//     setShippingAddress(state, action) {
//       state.shippingAddress = action.payload;
//     },
//     setPaymentMethod(state, action) {
//       state.paymentMethod = action.payload;
//     },
//     clearCheckout(state) {
//       state.checkoutItems = [];
//       state.totalAmount = 0;
//       state.shippingAddress = {};
//       state.paymentMethod = '';
//     },
//   },
// });

// export const {
//   addCheckoutItem,
//   removeCheckoutItem,
//   setShippingAddress,
//   setPaymentMethod,
//   clearCheckout,
// } = checkoutSlice.actions;

// export default checkoutSlice.reducer;
