import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

/**  eslint ignore **/
const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
