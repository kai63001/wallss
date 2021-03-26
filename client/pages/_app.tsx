import '@/styles/globals.sass'
import { ApolloProvider } from '@apollo/react-hooks';

import {withApollo} from '../util/apollo';

function MyApp({ Component, pageProps}) {
  return (
      <Component/>
  );
}

export default withApollo({ssr:true})(MyApp)
