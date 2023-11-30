import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/loginSlice";
import authService from "../appwrite/auth";

function LogoutBtn({ children, classname = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function eventHandler() {
    const response = await authService.logout();
    if (response) {
      dispatch(logout);
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
