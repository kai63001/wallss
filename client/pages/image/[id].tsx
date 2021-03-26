import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Wallpaper.module.sass";

const WALLPAPER_QUERY = gql`
  query Wallpaper($_id: ID!) {
    wallpaper(_id: $_id) {
      image
      name
      user {
        name
      }
    }
  }
`;

const ImageWall = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(WALLPAPER_QUERY, {
    variables: {
      _id: id,
    },
  });


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <Layout>
      <div className="main2">
        <div className={styles.header}>
          {/* Profile */}
          <div className={styles.profile}>
            <div className={styles.imgPorfile}>
              <Image
                className="avatar-radius"
                src="https://avatarfiles.alphacoders.com/276/thumb-1920-276208.jpg"
                title={`upload by: ${data.wallpaper.user.name}`}
                alt={`upload by: ${data.wallpaper.user.name}`}
                width={60}
                height={60}
                quality={100}
                objectFit="cover"
                objectPosition="center center"
                layout="intrinsic"
              />
            </div>
            <div className={styles.nameProfile}>
              <h1 className={styles.nameWall}>
                {data.wallpaper.name || "Wallss"}
              </h1>
              <span className={styles.uploadBy}>
                by {data.wallpaper.user.name.toUpperCase()}
              </span>
            </div>
          </div>
          {/* Download and Share */}
          <div className={styles.rightDetail}>
            <div className="main-btn pointer">
              <i className="fas fa-download"></i> Download{" "}
            </div>
          </div>
        </div>
        {/* IMAGE WALLPAPER */}
        <Image
          className="imageRadius wallpaperLoading"
          src={data.wallpaper.image}
          alt={`Wallpaper ID: ${id}`}
          title={`Wallpaper ID: ${id}`}
          width={2000}
          height={1200}
          quality={100}
          objectFit="cover"
          objectPosition="center center"
          layout="intrinsic"
        />
        <br />
        <Link href="/">
          <a className={styles.tags}>romeo</a>
        </Link>
        <Link href="/">
          <a className={styles.tags}>romeo</a>
        </Link>
        <br />
        <div className={styles.comment}>
          <h2>Comments</h2>
          <div className="box">
          	asdasd
						<button>Leave</button>
          </div>
        </div>
        <br />
      </div>
    </Layout>
  );
};

export default ImageWall;
