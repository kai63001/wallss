import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Register.module.sass";
import { login, LOGIN_QUERY } from "../../middleware/auth.middleware";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [loginMutation, { loading, error }] = useMutation(LOGIN_QUERY);
  const fixBugValidate = (e) => {
    setErrorLogin(false);
  };
  const letLogin = async (e) => {
    e.preventDefault();
    loginMutation({
      variables: {
        username: username,
        password: password,
      },
    })
      .then(async (res) => {
        console.log(res.data.login.jwt);
        const getLogin = await login(res.data.login.jwt);
        if (getLogin == "success") {
          router.push("/");
        }
      })
      .catch((error) => {
        if (error == "Error: User not found") {
          console.log("Error: User not found");
          setErrorLogin(true)
        }
      })
      .finally(() => {
        console.log("hahaha");
      });
  };
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
          <div className={styles.mainContent + " inboxColor"}>
            <h1 className="p-0 m-0">Sign Into Wallss Community</h1>
            Don't have an account yet?
            <Link href="/auth/register">
              <a className="color-main"> Sign Up</a>
            </Link>
            <br />
            <br />
            <form onSubmit={letLogin}>
              {errorLogin ? (
                <span className="color-main">
                  Incorrect username or password. Please try again.
                  <br />
                </span>
              ) : (
                ""
              )}
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
                onChange={(e) => {
                  setUsername(e.target.value);
                  fixBugValidate(e);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  fixBugValidate(e);
                }}
                required
              />

              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
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
