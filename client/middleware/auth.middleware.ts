import jwt from 'jsonwebtoken';
import gql from 'graphql-tag';
// import cookieCutter from 'cookie-cutter'
import { Cookies } from 'react-cookie';

const SECRET = process.env.SECRET || 'shadow';
const cookies = new Cookies();
export const test = () => {
    return 'test';
};

export const LOGIN_QUERY = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            jwt
        }
    }
`;

export const login = (jwt: String) => {
    console.log('set cookie');
    cookies.set('user', `barer ${jwt}`, { path: '/' });
    return 'success';
};

export const veriftToken = async (ctx) => {
    let jwtToken = null
    if(ctx?.req){
      jwtToken = await decodeURIComponent(ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    }else{
      jwtToken = cookies.get('user')
    }

    console.log("jwt : "+jwtToken)
    // if (typeof window !== "undefined") {
    //   jwtToken = localStorage.getItem("user");
    // }
    try {
        return jwt.verify(jwtToken.split(' ')[1], SECRET);
    } catch (e) {
        // console.log("e:", e);
        console.log("error jwt");
        return null;
    }
};

export const getDecode = (token) => {
  if(token) {
    return jwt.verify(token.split(' ')[1], SECRET);
  }
  return null
}

export const logout = () => {
    if(cookies.get('user') != '') {
      cookies.remove('user');
      return 'success'
    }else{
      return null;
    }
};
