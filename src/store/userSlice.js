import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
} from "./thunkFunctions";
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
        console.log(action);
        state.userData.id = action.payload.uid;
        state.userData.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("auth", action.reloadUserInfo);
        // state.userData.id = action.reloadUserInfo.localId;
        // state.userData.email = action.reloadUserInfo.email;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userData = initialState.userData;
        state.isAuth = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
