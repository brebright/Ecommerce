// // src/features/user/userSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     user : null,
//   },
//   reducers: {
//     setUserDetails : (state, action) => {
//       state.user = action.payload;
//       console.log("Updated User State in Redux:", state.user);
//     },
//     loginStart(state) {
//       state.loading = true;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.currentUser = action.payload;
//     },
//     loginFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.currentUser = null;
//     },
//     updateUser(state, action) {
//       state.currentUser = { ...state.currentUser, ...action.payload };
//     },
//   },
// });

// // Export the actions defined in the slice
// export const {
//   setUserDetails,
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   updateUser,
// } = userSlice.actions;

// // Export the reducer as default
// export default userSlice.reducer;
