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
    clearPosts: (state) => {
      state.postsData = [];
    },
  },
});

export const { storePosts, clearPosts } = postSlice.actions;
export default postSlice.reducer;
