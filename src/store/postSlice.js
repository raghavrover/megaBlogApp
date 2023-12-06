import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    postsData: [],
  },
  reducers: {
    storePosts: (state, action) => {
      state.postsData = action.payload;
    },
  },
});

export const { storePosts } = postSlice.actions;
export default postSlice.reducer;
