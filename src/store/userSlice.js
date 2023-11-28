import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./thunkFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  userData: {
    id: "",
    email: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(registerUser.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("회원가입에 성공했습니다.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userData.id = action.payload.uid;
        state.userData.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
