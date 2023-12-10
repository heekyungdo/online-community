import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // { id: 0, text: 'Learn React', completed: true },
  // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  // { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }

  {
    id: "",
    title: "",
    description: "",
    writer: "",
    date: "",
    images: [],
  },
];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postData(state, action) {
      console.log("redex", action);
      state.writer = action.payload.writer;
      // state.id = action.payload.id;
      // state.title = action.payload.title;
      // state.description = action.payload.description;
      // state.writer = action.payload.writer;
      // state.date = action.payload.date;
      // state.images = action.payload.images;
    },
  },
});

export const { postData } = postSlice.actions;
