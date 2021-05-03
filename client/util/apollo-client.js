import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { Cookies } from 'react-cookie';
// import createUploadLink from 'apollo-upload-client'
import { createUploadLink } from 'apollo-upload-client';
const cookies = new Cookies();
export default function createApolloClient(initialState, ctx) {
    let jwtToken = null
    if(ctx?.req){
      jwtToken = decodeURIComponent(ctx.req.headers.cookie?.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    }else{
      jwtToken = cookies.get('user')
    }
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        // link: concat(authMiddleware, httpLink),
        link: createUploadLink({
          uri: 'http://0.0.0.0:4000/graphql',
          headers: {
            "authorization": jwtToken
          }
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}