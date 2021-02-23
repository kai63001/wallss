// const Link = require('next/link')
import Link from 'next/link'

const Navbar = (props) => (
  <nav>
    <div className="main">
      <div className="container">
        <Link href="/">
          <div className="logo">
              <img className="logoIn" src="/smallMoonsTalk.png" width="35px" alt="" />
              <div className="slogan">
                  MoonsTalk
              </div>
          </div>
        </Link>
        <div className="menu">
          <Link href="/">
              <a>หน้าแรก</a>
          </Link> 
          <Link href="/">
              <a className="active">ทั้งหมด</a>
          </Link> 
          <Link href="/">
              <a>เป็นที่นิยม</a>
          </Link> 
          <Link href="/">
              <a>สุ่ม</a>
          </Link> 
        </div>
        <div className="right">
          <div className="search">ค้นหา</div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar