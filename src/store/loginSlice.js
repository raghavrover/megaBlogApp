import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  user: null,
};

// reducer to update login status in the store.
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loginStatus = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
