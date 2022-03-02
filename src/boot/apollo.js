import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import fetch from 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { LocalStorage } from 'quasar';
import state from '../store/auth/state';

// Config URL to call API
const uri = process.env.API;
// console.log('url: ', process.env.API);

// Create HTTP Link
const httpLink = createHttpLink({
  uri: uri,
  fetch: fetch,
  // headers: headers,
});

const headerLink = setContext((request, previousContext) => {
  // Get user token
  let token = '';
  if (LocalStorage.getItem('USER_INFO')) {
    token = LocalStorage.getItem('USER_INFO').token;
  } else if (state.currentUser) {
    token = state.currentUser.token;
  }
  return {
    headers: {
      // Make sure you include any existing headers!
      ...previousContext.headers,
      authorization: `Bearer ${token}`,
    },
  };
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: headerLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      // graphQLErrors.map(({ message, locations, path }) => {
      return;
      //  });
    }
    if (networkError) {
      // console.log(`[Network error]: ${networkError}`);
    }
  },
});

export default ({ app, Vue }) => {
  Vue.use(VueApollo);
  app.apolloProvider = apolloProvider;
};
