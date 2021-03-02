import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.sass";

export default function Home() {
  const image = ['https://images4.alphacoders.com/113/1133943.png','https://images.alphacoders.com/113/1133684.jpg','https://images4.alphacoders.com/113/1133047.jpg']
  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="main2">
        <div className="container">
        {image.map(i=> {
          return (<div className={styles.mainImage}>
          <Image
            src={i}
            alt="Picture of the author"
            width={500}
            height={300}
            quality={100}
            layout="intrinsic"
          />
        </div>)
        })}
          
        </div>
      </div>
    </Layout>
  );
}
