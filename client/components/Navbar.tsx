// const Link = require('next/link')
import Link from "next/link";

const Navbar = (props) => (
  <nav className="navbar">
    <div className={"container main"}>
      <div className={"logo"}><Link href="/"><a>WALLSS</a></Link></div>
      <div className={"search"}>
        <form action="" method="get">
          <input type="text" className="searchinput" placeholder="Search.."/>
        </form>
      </div>
      <div className={"rightOne"}>
        <Link href="/upload">
          <a className="main-btn"> <i className="fas fa-upload"></i> Upload</a>
        </Link>
      </div>
      <div className={"right"}>
        <Link href="/auth/register">
          <a className="dark-btn">Create Account</a>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
