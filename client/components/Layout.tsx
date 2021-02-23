import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(import("./Header"));
const Navbar = dynamic(import("./Navbar"));

const Layout = (props) => (
  <>
    <Head>
      <link rel="icon" type="image/png" href="/smallMoonsTalk.png" />
    </Head>
    <Header title={props.title} des={props.des} can={props.can} image={props.image} />
    <Navbar />
    <main>{props.children}</main>
  </>
);

export default Layout