import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for user registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('https://task-manager.codionslab.com/api/v1/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // You can include the token if needed
                    // 'Authorization': 'Bearer 123',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            return data; // Return the successful response data
        } catch (error) {
            return rejectWithValue(error.message); // Return the error message
        }
    }
);

// Create a slice for registration
const registerSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Store user data on successful registration
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Store error message on failure
            });
    },
});

// Export the actions and reducer
export const { clearError } = registerSlice.actions;
export default registerSlice.reducer;
