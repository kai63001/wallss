import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import styles from "../../styles/Wallpaper.module.sass";

const WALLPAPER_QUERY = gql`
  query Wallpaper($_id: ID!) {
    wallpaper(_id: $_id) {
      image
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
              <h1 className={styles.nameWall}>{data.wallpaper.name || "Wallss"}</h1>
              <span className={styles.uploadBy}>by {data.wallpaper.user.name.toUpperCase()}</span>
            </div>
          </div>
          {/* Download and Share */}
          <div className="">Download</div>
        </div>
        {/* IMAGE WALLPAPER */}
        <Image
          className="imageRadius wallpaperLoading"
          src={data.wallpaper.image}
          alt={`Wallpaper ID: ${id}`}
          title={`Wallpaper ID: ${id}`}
          width={2000}
          height={1000}
          quality={100}
          objectFit="cover"
          objectPosition="center center"
          layout="intrinsic"
        />
      </div>
    </Layout>
  );
};

export default ImageWall;
