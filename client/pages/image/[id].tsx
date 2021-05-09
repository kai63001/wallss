import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Wallpaper.module.sass";
import {dayNow} from "@/middleware/days.middleware"

const WALLPAPER_QUERY = gql`
  query Wallpaper($_id: ID!) {
    wallpaper(_id: $_id) {
      image
      name
      user {
        name
      }
      author
      tags
      categoly
      resolution
      date
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
                Shared by {data.wallpaper.user.name.toUpperCase()} {data.wallpaper.author && (`● Author ${data.wallpaper.author.toUpperCase()}`)}
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
        <div className={styles.tagCat}>
          <div className="">
            {data.wallpaper.categoly && (
              <>
                <Link href="/">
                  <a className={styles.tags + " tagColor"}>{data.wallpaper.categoly}</a>
                </Link>
                <br />
              </>
            )}
          </div>
          <div className="">
            {data.wallpaper.tags.map((tag, i) => (
              <Link href="/" key={i}>
                <a className={styles.tags + " tagColor"}>{tag}</a>
              </Link>
            ))}
          </div>
        </div>
        <br />
        <div className="box">
          {data.wallpaper?.resolution &&(
            <div>
              Resolution : {data.wallpaper.resolution}
            </div>
          )}
          <div>
            Date Added : {dayNow(data.wallpaper.date)}
          </div>
        </div>
        <div className={styles.comment}>
          <h2>Comments</h2>
          <div className="box">
            <textarea name="" id="" className={styles.textarea + " inputColor"} spellCheck="false" cols={100} rows={5} placeholder="Comment.." ></textarea>
            <br/>
            <button className={styles.leaveComment + " pointer tagColor"}>Leave Comment</button>
            <div className="clearfix"></div>
          </div>
        </div>
        <br />
      </div>
    </Layout>
  );
};

export default ImageWall;
