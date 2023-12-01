import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
      // 이름이나 그 외 정보 입력하려면 가입 후 프로필을 업데이트 해줘야한다.
      await updateProfile(auth.currentUser, { displayName: body.name });
      return userCredential.user;
    } catch (error) {
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage.substr(16));
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
      const errorMessage = error.message;
      return thunkAPI.rejectWithValue(errorMessage.substr(16));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
      });
  }
);
