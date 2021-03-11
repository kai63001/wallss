import '../styles/globals.sass'
import { ApolloProvider } from '@apollo/react-hooks';

import {withApollo} from '../util/apollo';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withApollo({ssr:true})(MyApp)
