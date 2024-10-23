import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Example async action for updating the profile
export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://task-manager.codionslab.com/api/v1/profile',
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
};

// Create authSlice using createSlice from Redux Toolkit
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); // Clear token from localStorage
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
