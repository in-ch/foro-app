import {makeVar} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';

export const hideBottomBar = makeVar(true);
export const TOKEN: string = 'token';
export const SKIP: string = 'skip';

// 로그인 관련 state
export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar(null);
export const tokenUserNo = makeVar(null);

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem(TOKEN, token);
  const decoded: any = decode(token);
  isLoggedInVar(true);
  tokenVar(token);
  tokenUserNo(decoded.id);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
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
    isLoggedInVar(true);
    tokenVar(to);
    const decoded: any = decode(to);
    tokenUserNo(decoded.id);
  }
};

// 인트로 관련
export const IntroSkip = makeVar<string | null>(null);

const skipIntro = async () => {
  // 스킵 토큰이 있는 지 없는지
  const sk: any = await AsyncStorage.getItem(SKIP);
  if (sk) {
    // await AsyncStorage.removeItem(SKIP);
    IntroSkip('true');
  }
};
export const doIntroSkip = async () => {
  await AsyncStorage.setItem(SKIP, 'true');
};

// 실행
usedToken();
skipIntro();
