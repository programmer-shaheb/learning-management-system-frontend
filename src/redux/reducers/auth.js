import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  isLoading: false, // Loading state added for handling async actions
  error: null, // Error state can be added for error handling if needed
};

// Create an auth slice with reducers and actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      state.authData = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    removeAuthData: (state, action) => {
      localStorage.clear();
      state.authData = null;
    },
  },
});

// Export action creators
export const { setAuthData, setLoading, setError, removeAuthData } =
  authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
