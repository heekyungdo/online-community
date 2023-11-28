import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import app from "../utils/firebase";

const auth = getAuth(app);
const currentUser = auth.currentUser;

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
      // setPersistence(auth, browserSessionPersistence).then(() => {
      //   // Existing and future Auth states are now persisted in the current
      //   // session only. Closing the window would clear any existing state even
      //   // if a user forgets to sign out.
      //   // ...
      //   // New sign-in will be persisted with session persistence.
      //   // const userLogin = signInWithEmailAndPassword(
      //   //   auth,
      //   //   body.email,
      //   //   body.password
      //   // );
      //   // return userLogin.user;
      //   return signInWithEmailAndPassword(auth, body.email, body.password);
      // });
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

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const user = user;
        return user;
        // ...
      } else {
        // User is signed out
        // ...
        // return thunkAPI.rejectWithValue(error);
      }
    });
    // try {
    //   onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //       return;
    //     }
    //     return user;
    //   });
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error);
    // }
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
