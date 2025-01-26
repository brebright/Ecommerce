// import { createSlice } from '@reduxjs/toolkit';

// const productSlice = createSlice({
//   name: 'product',
//   initialState: {
//     products: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     fetchProductsStart(state) {
//       state.loading = true;
//     },
//     fetchProductsSuccess(state, action) {
//       state.loading = false;
//       state.products = action.payload;
//     },
//     fetchProductsFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     addProduct(state, action) {
//       state.products.push(action.payload);
//     },
//     removeProduct(state, action) {
//       state.products = state.products.filter(product => product.id !== action.payload);
//     },
//   },
// });

// export const {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
//   addProduct,
//   removeProduct,
// } = productSlice.actions;

// export default productSlice.reducer;
