import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddPost from "./pages/AddPost";
import AllPosts from "./pages/AllPosts";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

import "./index.css";

//TODO: Implement Protected Routes by wrapping Components inside a authentication Component. Home, AddPost, EditPost, AllPosts, Post.
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/**Add an error boundary for non-specified routes */}
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="add-post" element={<AddPost />} />
      <Route path="edit-post" element={<EditPost />} />
      <Route path="all-posts" element={<AllPosts />} />
      <Route path="post/:id" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
