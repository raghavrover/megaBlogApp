import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import Button from "./Button";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.login.loginStatus);

  const navList = [
    {
      id: "HOME",
      name: "Home",
      route: "/",
      showStatus: authStatus,
    },
    {
      id: "LOGIN",
      name: "Login",
      route: "/login",
      showStatus: !authStatus,
    },
    {
      id: "SIGN_UP",
      name: "Sign Up",
      route: "/sign-up",
      showStatus: !authStatus,
    },
    {
      id: "ALL_POSTS",
      name: "All Posts",
      route: "/all-posts",
      showStatus: authStatus,
    },
    {
      id: "ADD_POST",
      name: "Add Post",
      route: "/add-post",
      showStatus: authStatus,
    },
  ];

  return (
    <>
      <header className="w-full py-1 shadow bg-gray-500">
        <nav className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
          <Logo />
          <div>
            <ul className="hidden md:flex items-center justify-between gap-2">
              {navList.map((navObject) => (
                <li
                  className={navObject.showStatus ? "" : "hidden"}
                  key={navObject.id}
                >
                  <Button>
                    <Link to={navObject.route}>{navObject.name}</Link>
                  </Button>
                </li>
              ))}
              {authStatus && (
                <li>
                  <LogoutBtn>Logout</LogoutBtn>
                </li>
              )}
            </ul>
          </div>

          <Button className="md:hidden mr-3">Menu</Button>
        </nav>
      </header>
    </>
  );
}

export default Header;
