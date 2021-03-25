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
            <Link href="/">
              <a className="dark-btn">{veriftToken().name}</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
