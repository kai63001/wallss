import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Register.module.sass";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useState } from "react";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $name: String!) {
    register(username: $username, password: $password, name: $name) {
      name
    }
  }
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");
  let [register, { data }] = useMutation(REGISTER_MUTATION);
  const onRegister = (e) => {
    e.preventDefault();
    if (password != vpassword) {
      e.target.password.setCustomValidity(
        "Password and VerifyPassword not match!!"
      );
      e.target.password.checkValidity();

      // e.setCustomValidity('');
    } else {
      register({
        variables: {
          username: username,
          password: password,
          name: username,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // console.log(e)
          if (error == "Error: username already exit") {
            console.log("username already exit");
            e.target.username.setCustomValidity("username already exit");
          }
        });
    }
  };
  return (
    <Layout title="Create an account">
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
            Already have an account?{" "}
            <Link href="/auth/login">
              <a className="color-main"> Sign In</a>
            </Link>
            <br />
            <br />
            <form onSubmit={onRegister}>
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  e.target.setCustomValidity('')
                }}
              />
              <br />
              <label className="main-label" htmlFor="email">
                Email Address :
              </label>
              <br />
              <input
                id="email"
                name="email"
                className="main-input"
                type="email"
                placeholder="user@wallss.net"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  e.target.setCustomValidity('')
                }}
              />
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  e.target.setCustomValidity('')
                }}
                required
              />
              <label className="main-label" htmlFor="vpassword">
                Verify Password :
              </label>
              <br />
              <input
                id="vpassword"
                name="vpassword"
                className="main-input"
                type="password"
                placeholder="wallPass@1234"
                value={vpassword}
                onChange={(e) => {
                  setVPassword(e.target.value);
                  e.target.setCustomValidity('')
                }}
                required
              />
              <input type="checkbox" name="accept" id="accept" required />
              <label htmlFor="accept">
                I have read and agree to the Privacy Policy
              </label>
              <br />
              <br />
              <input
                type="submit"
                className={styles.btnSummit}
                value="Create account"
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
