import { Link } from "react-router-dom";
import "./index.css";

const Header = () => (
  <>
    <nav className="bgHeader">
      <Link className="linkHeader" to="/">
        <img
          src="https://play-lh.googleusercontent.com/J2TBdARQQx5d_1uI27aIMoJPo5HxA_jx_0-T0AygUM0l_Zf7RSEj3Go0FDQNx0WoV4g=w240-h480-rw"
          alt="logo"
          className="headerLogo"
        />
      </Link>
    </nav>
  </>
);
export default Header;
