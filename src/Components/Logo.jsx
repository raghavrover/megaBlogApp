import { Link } from "react-router-dom";
import brandLogo from "../assets/logo.png";

function Logo() {
  return (
    <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
      <Link to="/">
        <img src={brandLogo} className="w-32 object-cover" />
      </Link>
    </div>
  );
}

export default Logo;
