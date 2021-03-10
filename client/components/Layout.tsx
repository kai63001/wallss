import Head from "next/head";
import dynamic from "next/dynamic";
const Header = dynamic(import("./Header"));
const Navbar = dynamic(import("./Navbar"));
const Footer = dynamic(import("./Footer"));

const Layout = (props) => (
  <>
    <Head>
      <link rel="icon" type="image/png" href="/ice-cream.png" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
        crossOrigin="anonymous"
      />
    </Head>
    <Header
      title={props.title}
      des={props.des}
      can={props.can}
      image={props.image}
    />
    <Navbar />
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout