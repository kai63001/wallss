// const Link = require('next/link')
import Link from "next/link";
import { veriftToken } from "../middleware/auth.middleware";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className={"main"}>
        <div className={"logo"}>
          <Link href="/">
            <a>WALLSS</a>
          </Link>
        </div>
        <div className={"search"}>
          <form action="" method="get">
            <input type="text" className="searchinput" placeholder="Search.." />
          </form>
        </div>
        <div className="rightMenu">
        <div className={""}>
          <Link href="/upload">
            <a className="dark-btn">
              <i className="fas fa-moon"></i>
            </a>
          </Link>
        </div>
        <div className={""}>
          <Link href="/upload">
            <a className="main-btn">
              <i className="fas fa-upload"></i> Upload
            </a>
          </Link>
        </div>
        <div className={"createAccount"}>
          {veriftToken() == null ? (
            <Link href="/auth/register">
              <a className="dark-btn">Create Account</a>
            </Link>
          ) : (
            <div className="dropdown">
              <div className="dropbtn">{veriftToken().name.charAt(0).toUpperCase()+veriftToken().name.slice(1)}</div>
              <div className="dropdown-content">
                <Link href="/">
                  <a>Edit account</a>
                </Link>
                <Link href="/">
                  <a>My favorites</a>
                </Link>
                <Link href="/auth/logout">
                  <a>Logout</a>
                </Link>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
