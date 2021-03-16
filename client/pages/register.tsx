import Layout from "../components/Layout";
import Image from "next/image";
import styles from "../styles/Register.module.sass";

const Register = () => {
  return (
    <Layout>
      <div className={styles.middle}>
        <div className={styles.content}>
          <div className={styles.cover}>
            <Image
              src="https://images3.alphacoders.com/113/1131150.png"
              alt="wallss create an accounts"
              quality={100}
              layout="fill"
              objectFit="cover"
              objectPosition="bottom center"
            />
          </div>
          <div className={styles.mainContent}>
            <h1 className="p-0 m-0">Create an account</h1>
            <br/>
            <form action="#" method="POST">
                <label className="main-label" htmlFor="username">Username :</label>
                <br/>
                <input id="username" name="username" className="main-input" type="text" placeholder="wallss" required/>
                <br/>
                <label className="main-label" htmlFor="email">Email Address :</label>
                <br/>
                <input id="email" name="email" className="main-input" type="text" placeholder="user@wallss.net" required/>
                <label className="main-label" htmlFor="password">Password :</label>
                <br/>
                <input id="password" name="password" className="main-input" type="password" placeholder="wallPass@1234" required/>
                <label className="main-label" htmlFor="vpassword">Verify Password :</label>
                <br/>
                <input id="password" name="vpassword" className="main-input" type="password" placeholder="wallPass@1234" required/>
                <br/>
                <br/>
                <input type="submit" className={styles.btnSummit} value="Create account"/>
                <div className="clearfix"/>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Register;
