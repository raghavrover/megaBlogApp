/**
 * 1. Delete Session from AppWrite Service with the `logout` method
 * 1.1 if the request is successful update the `Store` with the `logout` action of the loginSlice
 * 1.2 if the request failed display an error
 */

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../store/loginSlice";
import authService from "../appwrite/auth";

function LogoutBtn({ children, classname = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function eventHandler() {
    const response = await authService.logout();
    if (response) {
      dispatch(authLogout);
      navigate("/login");
    } else {
      console.log("User Could not Logout ");
    }
  }
  return (
    <button
      className={`px-4 py-2 rounded-3xl hover:bg-slate-200 hover:text-slate-400 ${className}`}
      onClick={eventHandler}
    >
      {children}
    </button>
  );
}

export default LogoutBtn;
