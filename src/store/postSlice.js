import { createSlice } from "@reduxjs/toolkit";

const initialState={
  postInto: {
    writer: "",
    date: "",
    title: "",
    description:"",
    images:[],
    id:"",
    index:0
  },
}
  
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postData:(state, action) =>{
state.postInfo=action.payload
  },
}
});

export default postSlice.reducer;
export const { postData } = postSlice.actions;
