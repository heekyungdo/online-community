import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { postData } = postSlice.actions;
