import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users with token included in the headers
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found. Please log in again.');
    }

    try {
      const response = await axios.get('https://task-manager.codionslab.com/api/v1/admin/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Error fetching users');
    }
  }
);

// Create a new user with token in headers
export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUserData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found. Please log in again.');
    }

    try {
      const response = await axios.post(
        'https://task-manager.codionslab.com/api/v1/admin/user',
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Error creating user');
    }
  }
);

// Async thunk for editing a user
export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ userId, updatedUserData }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found. Please log in again.');
    }

    try {
      const response = await axios.put(
        `https://task-manager.codionslab.com/api/v1/admin/user/${userId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error updating user'
      );
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found. Please log in again.');
    }

    try {
      await axios.delete(`https://task-manager.codionslab.com/api/v1/admin/user/${userId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return userId; // Return the userId for filtering
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error deleting user'
      );
    }
  }
);

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    createStatus: 'idle', // Track the status for user creation
    createError: null,    // Track errors for user creation
    editStatus: 'idle',   // Track the status for user editing
    editError: null,      // Track errors for user editing
    deleteStatus: 'idle', // Track the status for user deletion
    deleteError: null,    // Track errors for user deletion
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data.data;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch users';
      })
      .addCase(createUser.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.users.push(action.payload.data); // Add the new user to the users list
        state.createError = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload || 'Failed to create user';
      })
      .addCase(editUser.pending, (state) => {
        state.editStatus = 'loading'; // Set loading status for editing
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.editStatus = 'succeeded'; // Set succeeded status for editing
        state.editError = null; // Clear any previous errors
        // Update the user in the users list
        const index = state.users.findIndex(user => user.id === action.payload.data.id);
        if (index !== -1) {
          state.users[index] = action.payload.data; // Replace the user with the updated data
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editStatus = 'failed'; // Set failed status for editing
        state.editError = action.payload || 'Failed to edit user'; // Capture detailed error message
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = 'loading'; // Set loading status for deletion
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded'; // Set succeeded status for deletion
        state.deleteError = null; // Clear any previous errors
        // Remove the user from the list
        state.users = state.users.filter(user => user.id !== action.payload); // Remove the deleted user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = 'failed'; // Set failed status for deletion
        state.deleteError = action.payload || 'Failed to delete user'; // Capture detailed error message
      });
  },
});

export default allUsersSlice.reducer;
