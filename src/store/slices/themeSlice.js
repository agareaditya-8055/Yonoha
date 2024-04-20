// Importing createSlice from Redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the theme
const initialState = {
  darkMode: false,
  response: "light",
};

// Creating a slice for theme
const themeSlice = createSlice({
  name: "theme",
  initialState,
  // Reducers for the slice
  reducers: {
    // Reducer to enable dark mode
    toggleDarkMode: (state) => {
      state.darkMode = true; // Set darkMode to true
      state.response = "dark"; // Set response to "dark"
    },

    // Reducer to enable light mode
    toggleLightMode: (state) => {
      state.darkMode = false; // Set darkMode to false
      state.response = "light"; // Set response to "light"
    },
  },
});

export const { toggleDarkMode, toggleLightMode } = themeSlice.actions;

export default themeSlice.reducer;
