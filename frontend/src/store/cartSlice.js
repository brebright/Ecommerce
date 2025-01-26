import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.sellingPrice * newItem.quantity;

      localStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to localStorage
    },
    removeItem(state, action) {
      const id = action.payload;
      const itemToRemove = state.items.find(item => item._id === id);
      
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.sellingPrice * itemToRemove.quantity;
        state.items = state.items.filter(item => item._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to localStorage
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartItems'); // Clear localStorage
    },
    increaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item._id === id);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += item.sellingPrice;
        localStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to localStorage
      }
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item._id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.sellingPrice;
        localStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to localStorage
      } else {
        // If quantity is 1, remove item
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.sellingPrice * item.quantity;
        state.items = state.items.filter(item => item._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(state.items)); // Persist to localStorage
      }
    },
  },
});

export const { addToCart, removeItem, clearCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
