import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://task-manager.codionslab.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to login');
      }

      const data = await response.json();
      const token = data.data.token
      // Store the token in localStorage
      localStorage.setItem('token', token);
      console.log(token);
       // Store token on login
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

// Create the login slice
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    accessToken: null,
    isLogin: false,
    isLoading: false,
    error: null,
    isRegister: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLogin = false;
      state.isLoading = false;
      state.error = null;
      state.isRegister = false; // Reset register state on logout
      localStorage.removeItem('token'); // Clear token from localStorage on logout
    },
    resetRegister: (state) => {
      state.isRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // Set user data
        state.accessToken = action.payload.token; // Store the token in the state
        state.isLogin = true; // Set login state
        state.isLoading = false; // Clear loading state
        state.error = null; // Clear error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed'; // Capture login error
        state.isLoading = false; // Clear loading state
      });
  },
});

// Export actions and reducer
export const { logout, resetRegister } = loginSlice.actions;
export default loginSlice.reducer;
