// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null,
//     accessToken: null,
//     isLogin: false,
//     isLoading: false,
//     error: null,
//     isRegister: false,
// };

// const logoutSlice = createSlice({
//     name: 'logout',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.accessToken = null;
//             state.isLogin = false;
//             state.isLoading = false;
//             state.error = null;
//             state.isRegister = false; // Reset register state on logout
//         },
//         resetRegister: (state) => {
//             state.isRegister = false;
//         },
//     },
// });

// export const { logout, resetRegister } = logoutSlice.actions;

// export default logoutSlice.reducer;
