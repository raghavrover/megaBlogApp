import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login"); // To redirect unauthorized access of protected routes(Home, AllPosts, AddPost, EditPost, Post)
    } else if (!authentication && authStatus !== authentication) {
      navigate("/"); // Redirecting to `Home` if an authorized user tries to access the public routes(Login, SingUp)
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>; // need to render children conditionally
}

export default ProtectedRoute;
