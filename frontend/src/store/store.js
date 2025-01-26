import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import ordersReducer from './orderslice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    cart : cartReducer,
    orders : ordersReducer
  },
})

export default store;
