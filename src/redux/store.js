import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice'; // Use the updated loginSlice
import profileReducer from './Slices/profileSlice'; // Import the profileSlice
import allUsersReducer from './Slices/allUsersSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer, // Include login slice for both login and logout
        profile: profileReducer, // Add the profile slice
        allusers: allUsersReducer, // Add the new reducer
    },
});

export default store;
