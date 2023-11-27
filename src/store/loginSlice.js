import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  user: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.loginStatus = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
