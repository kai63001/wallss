import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.sass";
import Link from "next/link";
import Collection from "../components/card/Collection";

export default function Home() {
  const image = [
    "https://images4.alphacoders.com/113/1133943.png",
    "https://images.alphacoders.com/113/1133684.jpg",
    "https://images4.alphacoders.com/113/1133047.jpg",
  ];
  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="main2">
        <div className="container">
          {image.map((i) => {
            return (
              <div className={styles.mainImage}>
                <Image
                  className="imageRadius"
                  src={i}
                  alt="Picture of the author"
                  width={500}
                  height={300}
                  quality={100}
                  layout="intrinsic"
                />
              </div>
            );
          })}
        </div>
        {/* จบส่วนบน */}
        <br />
        <br />
        <div className={styles.bannerOne}>
          <div className={styles.mainName}>
            <h2>
              Share the things <br /> you create, or share the things <br /> you
              love.
            </h2>
          </div>
          <div className={styles.btnBanner}>
            <Link href="/">
              <a className="main-btn">
                <i className="fas fa-upload"></i> Upload
              </a>
            </Link>
          </div>
          <Image
            className="imageRadius"
            src="/static/images/banner.jpg"
            alt="Picture of the author"
            width={1300}
            height={300}
            quality={100}
            layout="intrinsic"
          />
        </div>
        <br/><br/>
        <div className={styles.collection}>
          <h2 className={styles.fontCollection}>Collection</h2>
          <div className={styles.center}>
          <Link href="/">
              <a className="main-btn-outBack">
                <div className="main-btn-outBack2">
                  More Collections
                </div>
              </a>
            </Link>
          </div>
        </div>
        <br/>
        <div className="container">
          <Collection />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  );
}
