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

import {makeVar} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';

export const hideBottomBar = makeVar(true);
export const TOKEN: string = 'token';
export const SKIP: string = 'skip';
export const ISLOGIN: string = 'isLogin';

export const tokenVar = makeVar(null);
export const tokenUserNo = makeVar(null);
export const isLoggedInVar = makeVar(false);
export const IntroSkip = makeVar<boolean>(false);

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem(TOKEN, token);
  const decoded: any = decode(token);
  isLoggedInVar(true);
  tokenVar(token);
  tokenUserNo(decoded.id);
  AsyncStorage.setItem(ISLOGIN, 'true');
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(ISLOGIN);
  isLoggedInVar(false);
  tokenVar(null);
  tokenUserNo(null);
};

// device 토큰
export const userDeviceToken = makeVar<string | null>(null);

const usedToken = async () => {
  // 토크닝 있으면 값을 여기다가 넣어줌.
  const to: any = await AsyncStorage.getItem(TOKEN);
  if (to) {
    // isLoggedInVar(true);
    tokenVar(to);
    const decoded: any = decode(to);
    tokenUserNo(decoded.id);
  }
};

const skipIntro = async () => {
  // 스킵 토큰이 있는 지 없는지
  const sk: any = await AsyncStorage.getItem(SKIP);
  if (sk) {
    IntroSkip(true);
  }
};

const isLogin = async () => {
  // 로그인이 되었는지 안되었었는지
  const sk: any = await AsyncStorage.getItem(ISLOGIN);
  if (sk) {
    isLoggedInVar(true);
  }
};
export const doIntroSkip = async () => {
  await AsyncStorage.setItem(SKIP, 'true');
};

// 실행
usedToken();
skipIntro();
isLogin();

// 로그인 관련 state 끝

const DevIosURL = 'http://localhost:4000';
const iosURL = 'http://13.209.190.64:4000';
const DevAndroidURL = 'http://localhost:4000';
const androidURL = 'http://13.209.190.64:4000';

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
