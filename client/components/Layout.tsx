import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(import("./Header"));
const Navbar = dynamic(import("./Navbar"));

const Layout = (props) => (
  <>
    <Head>
      <link rel="icon" type="image/png" href="/smallMoonsTalk.png" />
      <script data-ad-client="ca-pub-9787491065456428" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </Head>
    <Header title={props.title} des={props.des} can={props.can} image={props.image} />
    <Navbar />
    <main>{props.children}</main>
  </>
);

export default Layout