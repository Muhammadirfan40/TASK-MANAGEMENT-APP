// redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for updating profile
export const updateProfile = createAsyncThunk('profile/update', async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.post('https://task-manager.codionslab.com/api/v1/profile', formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add authorization token in headers
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetProfileState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
