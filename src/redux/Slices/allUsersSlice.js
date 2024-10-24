import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users with token included in the headers
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    console.log('Token being used:', token); // Log the token to verify its value

    if (!token) {
      console.error('No token found. Please log in again.'); // Log if token is missing
      return rejectWithValue('No token found. Please log in again.');
    }

    try {
      const response = await axios.get('https://task-manager.codionslab.com/api/v1/admin/user', {
        headers: {
          Authorization: `Bearer ${token}`, // Include your token here
        },
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error fetching users';
      console.error('Error fetching users:', errorMsg); // Log error details
      return rejectWithValue(errorMsg);
    }
  }
);

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    users: [], // Initialize users as an empty array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading'; // Set loading status when fetching
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded status on successful fetch
        state.users = action.payload.data.data; // Update the users state with the fetched data
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status on error
        state.error = action.payload || 'Failed to fetch users'; // Capture detailed error message
        console.error('Fetch all users failed:', state.error); // Log error details
      });
  },
});

export default allUsersSlice.reducer;
