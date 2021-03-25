import jwt from "jsonwebtoken";
import gql from "graphql-tag";

const SECRET = process.env.SECRET || "shadow";

export const test = () => {
  return "test";
};

export const LOGIN_QUERY = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      jwt
    }
  }
`;

export const login = (jwt: String) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", `barer ${jwt}`);
  }
  return "success";
};

export const veriftToken = () => {
  let jwtToken = "";
  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("user");
  }
  try {
    console.log(jwt.verify(jwtToken.split(" ")[1], SECRET));
    return jwt.verify(jwtToken.split(" ")[1], SECRET);
  } catch (e) {
    // console.log("e:", e);
    // console.log(jwtToken);
    return null;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('user')
    return "success"
  }
  return null
}
