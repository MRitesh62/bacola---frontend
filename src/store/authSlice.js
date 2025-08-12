import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./product-action";
const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Load user from sessionStorage
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");  // Clear user data on logout
      sessionStorage.removeItem("token"); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
      
        const token = action.payload.token;
        // if (token) {
        //   sessionStorage.setItem("token", token);
          
        //   try {
        //     const decodedUser = jwtDecode(token); // Decode token to get user details
        //     state.user = decodedUser;
        //     sessionStorage.setItem("user", JSON.stringify(decodedUser)); // Save decoded user data
        //   } catch (error) {
        //     console.error("Failed to decode token:", error);
        //     state.user = null;
        //   }
        // }
        state.user = action.payload.data;
      })
        .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
