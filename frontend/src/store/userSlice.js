    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SummaryApi from '../common';
const initialState = {
    user: null,
    cartProductCount: 0,
    totalPrice: 0,
    status: 'idle',
    error: null,
};
export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async (_, { dispatch }) => {
    const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
    });
    const userData = await response.json();
    
    if (userData.success) {
        return userData.user; 
    } else {
        throw new Error(userData.message); 
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setTotalQuantity: (state, action) => {
            state.cartProductCount = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; 
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; 
            });
    },
});
export const { clearUser, setTotalPrice, setUserDetails, setTotalQuantity } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.user; 
export default userSlice.reducer;
