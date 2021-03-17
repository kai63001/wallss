import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Home.module.sass";
import Link from "next/link";
import Collection from "../components/card/Collection";
import gql from 'graphql-tag';
import { useQuery,useMutation } from '@apollo/react-hooks';


// const JOBS_QUERY = gql`
//   mutation AddWallpaper($image: String!) {
//     addWallpaper(image: $image){
//       image
//     }
//   }
// `;

const WALLPAPER_QUERY = gql`
    query Wallpaper {
      wallpapers{
        image
      }
    }
`;

export default function Home() {
  // if (typeof window !== 'undefined') { 
  //   localStorage.setItem("user","barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDQ5ZWQ1Nzc3ZDViYzAwNTJjN2E0MmYiLCJuYW1lIjoicm9tZW8iLCJpYXQiOjE2MTU0NTgzNDQsImV4cCI6MTYxNjA2MzE0NH0.wSu4JKcTWW7X7-maalYzwK02p43UDVVLW4NMY9zMoGQ")
  // }
  // const [addTodo, { data }] = useMutation(JOBS_QUERY);
  // let input;
  const {data,loading ,error} = useQuery(WALLPAPER_QUERY,{
    variables: {
      limit: 1
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  console.log(data)
  const image = [
    "https://images4.alphacoders.com/113/1133943.png",
    "https://images.alphacoders.com/113/1133684.jpg",
    "https://images4.alphacoders.com/113/1133047.jpg",
  ];
  return (
    <Layout>
      {/* <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { image: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div> */}
      <div className="main2">
        <div className="container">
          {image.map((i, key) => {
            return (
              <div key={key} className={styles.mainImage}>
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
        {/* Collection */}
        <div className="container">
          <div className={styles.headCollet}>
            <br />
            <div className={styles.collection}>
              <h2 className={styles.fontCollection}>Collection</h2>
              <div className={styles.center}>
                <Link href="/">
                  <a className="main-btn-outBack">
                    <div className="main-btn-outBack2">More Collections</div>
                  </a>
                </Link>
              </div>
            </div>
            <br />
          </div>
          <div className={styles.bodyCollet}>
            <div className="container">
              {[...Array(6)].map((d, i) => (
                <Collection key={i} />
              ))}
            </div>
          </div>
        </div>
        {/* Wallpaper */}
        <br />
        <div className="container">
          <div className={styles.headCollet}>
            <br />
            <div className={styles.collection}>
              <h2 className={styles.fontCollection}>Featured Wallpaper</h2>
              <div className={styles.center}>
                <Link href="/">
                  <a className="main-btn-outBack">
                    <div className="main-btn-outBack2">More Wallpapers</div>
                  </a>
                </Link>
              </div>
            </div>
            <br />
          </div>
          {[...Array(6)].map((d, i) => (
            <div key={i} className={styles.mainImage}>
              <Image
                className="imageRadius"
                src="https://images2.alphacoders.com/113/thumb-1920-1134490.jpg"
                alt="Picture of the author"
                width={500}
                height={300}
                quality={100}
                layout="intrinsic"
              />
            </div>
          ))}
        </div>
        {/* banner2 */}
        <br />
        <br />
        <div className={styles.bannerOne}>
          <div className={styles.centerMain}>
            <div className={styles.details}>
              <h2>Keywords trending this week</h2>
              {[...Array(15)].map((d,i)=>(
                <span key={i} className={styles.keyword}>Naruto</span>
              ))}
            </div>
          </div>
          <Image
            className="imageRadius"
            src="/static/images/banner3.jpg"
            alt="Picture of the author"
            width={1300}
            height={300}
            quality={100}
            layout="intrinsic"
          />
        </div>
        {/* Mobile Wallpaper */}
        <br />
        <div className="container">
          <div className={styles.headCollet}>
            <br />
            <div className={styles.collection}>
              <h2 className={styles.fontCollection}>Featured Mobile</h2>
              <div className={styles.center}>
                <Link href="/">
                  <a className="main-btn-outBack">
                    <div className="main-btn-outBack2">More Wallpapers</div>
                  </a>
                </Link>
              </div>
            </div>
            <br />
          </div>
          {[...Array(12)].map((d, i) => (
            <div key={i} className={styles.mobileMain}>
              <Image
                className="imageRadius"
                src="https://mfiles.alphacoders.com/903/thumb-1920-903501.jpg"
                alt="Picture of the author"
                width={500}
                height={900}
                quality={100}
                layout="intrinsic"
              />
            </div>
          ))}
        </div>
        {/* Wallpaper */}
        <br />
        <div className="container">
          <div className={styles.headCollet}>
            <br />
            <div className={styles.collection}>
              <h2 className={styles.fontCollection}>Wallpapers</h2>
              <div className={styles.center}>
                <Link href="/">
                  <a className="main-btn-outBack">
                    <div className="main-btn-outBack2">More Wallpapers</div>
                  </a>
                </Link>
              </div>
            </div>
            <br />
          </div>
          {data.wallpapers.map((d, i) => (
            <div key={i} className={styles.mainImage}>
              <Image
                className="imageRadius"
                src={d.image}
                alt="Picture of the author"
                width={500}
                height={300}
                quality={100}
                layout="intrinsic"
              />
            </div>
          ))}
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

