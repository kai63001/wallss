import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Register.module.sass";

const Register = () => {
  return (
    <Layout title="Sign Into Wallss Community">
      <div className={styles.middle}>
        <div className={styles.content}>
          <div className={styles.cover}>
            <Image
              src="https://images7.alphacoders.com/110/1109641.jpg"
              alt="wallss create an accounts"
              quality={100}
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
            />
          </div>
          <div className={styles.mainContent}>
            <h1 className="p-0 m-0">Sign Into Wallss Community</h1>
            Don't have an account yet?
            <Link href="/auth/register">
              <a className="color-main"> Sign Up</a>
            </Link>
            <br />
            <br />
            <form action="#" method="POST">
              <label className="main-label" htmlFor="username">
                Username :
              </label>
              <br />
              <input
                id="username"
                name="username"
                className="main-input"
                type="text"
                placeholder="wallss"
                required
              />
              <br />
              
              <label className="main-label" htmlFor="password">
                Password :
              </label>
              <br />
              <input
                id="password"
                name="password"
                className="main-input"
                type="password"
                placeholder="wallPass@1234"
                required
              />
              
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">
                 Remember me
              </label>
              <br />
              <br />
              <input
                type="submit"
                className={styles.btnSummit}
                value="Sign In"
              />
              <div className="clearfix" />
            </form>
          </div>
        </div>
      </div>
      <br />
    </Layout>
  );
};
export default Register;
