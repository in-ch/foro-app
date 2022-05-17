import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {isAndroid} from '@utills/constants';

// 로그인 관련 state 끝

const DevIosURL = 'http://localhost:4000';
const iosURL = 'http://3.37.173.215:4000';
const DevAndroidURL = 'http://localhost:4000';
const androidURL = 'http://3.37.173.215:4000';

const URL = isAndroid ? androidURL : iosURL;
const devURL = isAndroid ? DevAndroidURL : DevIosURL;

// const wsLinkLink = isAndroid ? `ws://localhost:4000` : `ws://localhost:4000`;  // 개발용 웹 소켓용 link
const wsLinkLink = isAndroid
  ? 'ws://3.37.173.215:4000'
  : 'ws://3.37.173.215:4000'; // 웹 소켓용 link

export const API_URL = true ? URL : devURL; // 개발일 때 false, 배포일 때 true

const wsLink = new WebSocketLink({
  // 웹 소켓용 link 연결 코드
  uri: `${wsLinkLink}/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const client = new ApolloClient({
  link: splitLink,
  cache,
});
export default client;
