import jwt from "jsonwebtoken";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const KEY = process.env.KEY || "shadow";

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
    localStorage.setItem(
      "user",
      `barer ${jwt}`
    );
  }

  return "success"
};

export const veriftToken = () =>{

}
