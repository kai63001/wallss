import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Collectin.module.sass";

const Collection = (props) => (
  <Link href="/">
    <a className={styles.collection}>
      <div className={styles.head}>
        <div className={styles.avatar}>
          <Image
            className={styles.profileRadius}
            src="/static/images/artist.png"
            alt="Picture of the author"
            width={40}
            height={40}
            quality={50}
            layout="intrinsic"
          />
          <span className={styles.name}>HAHA</span>
        </div>
        <div className={styles.love}>
          <i className={"far fa-heart " + styles.iconLove}></i> 10
        </div>
      </div>
      <div className={styles.inBody}>
        <Image
          className="imageRadius"
          src="https://images6.alphacoders.com/112/thumb-1920-1126411.jpg"
          alt="Naruto"
          width={500}
          height={300}
          quality={50}
          layout="intrinsic"
        />
        <div className={styles.detail}>
          <div className="">
            <h3 className="p-0 m-0">Naruto</h3>
          </div>
          <div className="">100 photos</div>
        </div>
      </div>
    </a>
  </Link>
);

export default Collection;
