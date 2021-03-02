// const Link = require('next/link')
import Link from "next/link";

const Navbar = (props) => (
  <nav className="navbar">
    <div className={"container main"}>
      <div className={"logo"}>WALLSS</div>
      <div className={"search"}>
        <form action="" method="get">
          <input type="text" className="searchinput" placeholder="Search.."/>
        </form>
      </div>
      <div className={"right"}>
        <Link href="/">
          <a className="main-btn"> <i className="fas fa-upload"></i> Upload</a>
        </Link>
        <Link href="/">
          <a className="dark-btn">Create Account</a>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
