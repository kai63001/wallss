import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import cookie from 'cookie';
// import createUploadLink from 'apollo-upload-client'
import { createUploadLink } from 'apollo-upload-client';
export default function createApolloClient(initialState, ctx) {

    return new ApolloClient({
        ssrMode: Boolean(ctx),
        // link: concat(authMiddleware, httpLink),
        link: createUploadLink({
          uri: 'http://0.0.0.0:4000/graphql',
          headers: {
            "authorization": typeof window !== 'undefined'?localStorage.getItem("user"):''
          }
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}