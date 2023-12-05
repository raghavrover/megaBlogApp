import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
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
import ProtectedRoute from "./Components/ProtectedRoute";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/**Add an error boundary for non-specified routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute authentication>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="sign-up"
        element={
          <ProtectedRoute authentication={false}>
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-post"
        element={
          <ProtectedRoute authentication>
            <AddPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit-post"
        element={
          <ProtectedRoute authentication>
            <EditPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="all-posts"
        element={
          <ProtectedRoute authentication>
            <AllPosts />
          </ProtectedRoute>
        }
      />
      <Route
        path="post/:id"
        element={
          <ProtectedRoute authentication>
            <Post />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
