import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
