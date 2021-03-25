// const Link = require('next/link')
import Link from "next/link";
import { veriftToken } from "../middleware/auth.middleware";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className={"container main"}>
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
        <div className={"rightOne"}>
          <Link href="/upload">
            <a className="main-btn">
              <i className="fas fa-upload"></i> Upload
            </a>
          </Link>
        </div>
        <div className={"right"}>
          {veriftToken() == null ? (
            <Link href="/auth/register">
              <a className="dark-btn">Create Account</a>
            </Link>
          ) : (
            <div className="dropdown">
              <div className="dropbtn">{veriftToken().name}</div>
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
    </nav>
  );
};

export default Navbar;
