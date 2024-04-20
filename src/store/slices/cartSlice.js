// Importing createSlice from Redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Represents the items in the cart
  },

  // Reducers for the slice
  reducers: {
    // Reducer to add items to the cart
    addItems: (state, action) => {
      // Check if payload is an array
      if (Array.isArray(action.payload)) {
        // If it's an array, add all items to the cart
        state.items.push(...action.payload);
      } else {
        // If it's not an array, add the single item to the cart
        state.items.push(action.payload);
      }
    },

    // Reducer to remove items from the cart
    removeItems: (state, action) => {
      // Filter out the item to be removed
      state.items = state.items.filter((item) => item?.$id !== action?.payload);
    },

    // Reducer to clear the cart
    clearCart: (state) => {
      // Clear all items from the cart
      state.items = [];
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
