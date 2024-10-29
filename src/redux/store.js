import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import profileReducer from './slices/profileSlice';
import allUsersReducer from './slices/allUsersSlice';
import projectManagementReducer from './Slices/projectManagementSlice'; // Import the project management slice

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        profile: profileReducer,
        allusers: allUsersReducer,
        projectManagement: projectManagementReducer, // Add the project management reducer
    },
});

export default store;
