// Importing createSlice from Redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false, // Represents the login status
    userData: null, // Holds the user data when logged in
  },

  // Reducers for the slice
  reducers: {
    // Login reducer
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    // Logout reducer
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Exporting the actions from the slice
export const { login, logout } = authSlice.actions;

// Exporting the reducer from the slice
export default authSlice.reducer;
