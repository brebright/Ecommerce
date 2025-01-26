import { createSlice } from '@reduxjs/toolkit';

export const fetchOrdersFromAPI = () => {
  return async (dispatch) => {
    dispatch(setLoading(true)); 
    try {
      const response = await fetch('http://localhost:8080/api/allorders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      dispatch(setOrders(data.data)); 
    } catch (error) {
      dispatch(setError(error.message)); 
    } finally {
      dispatch(setLoading(false)); 
    }
  };
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orderList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOrders(state, action) {
      state.orderList = action.payload; // Set the fetched orders
    },
    setLoading(state, action) {
      state.loading = action.payload; 
    },
    setError(state, action) {
      state.error = action.payload; // Set error state
    },
  },
});

export const { setOrders, setLoading, setError } = ordersSlice.actions; 

export default ordersSlice.reducer;



