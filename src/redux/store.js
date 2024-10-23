import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your reducers here

const store = configureStore({
    reducer: {
        auth: authReducer // Add your slice reducer(s) here
    }
});

export default store;
