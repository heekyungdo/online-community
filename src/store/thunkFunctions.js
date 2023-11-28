import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../utils/firebase";

const auth = getAuth(app);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      return userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(
        errorMessage.search("email-already-in")
          ? "이미 존재하는 이메일입니다."
          : errorMessage
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const userLogin = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      return userLogin.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(
        errorMessage.search("invalid-login-credentials")
          ? "존재하지 않는 이메일입니다."
          : errorMessage
      );
    }
  }
);
