/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
// @ts-nocheck

import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  KakaoOAuthToken,
  login,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import auth, {firebase} from '@react-native-firebase/auth';
import {useMutation} from '@apollo/client';
import {Alert} from 'react-native';

import {
  LOAD_USER_WITH_TOKEN,
  INSERT_USER,
  LOGIN,
} from '@services/mutations/user';
import LoginPresenter from './LoginPresenter';
import {RootTabParamList} from '../../navigation/RootNavigation';
import {logUserIn} from '../../apollo/apollo';
interface Props {
  navigation: NavigationProp<RootTabParamList, 'Home'>;
}
interface KakaoProps {
  nickname?: string;
  profileImageUrl?: string;
}

const LoginContainer = ({navigation}: Props) => {
  const [loading, setLoading] = useState<boolean>(false); // 로딩
  const [token, setToken] = useState<string>(''); // 결과
  const [profile, setProfile] = useState<string>(''); // 유저 닉네임
  const [nickname, setNickname] = useState<string>(''); // 유저 프로필
  const [type, setType] = useState<string>(''); // 로그인 방법
  const [kakaoToken, setKakaoToken] = useState<string>(''); // 카카오 토큰
  const [googleToken, setGoogleToken] = useState<string>(''); // 구글 토큰
  const [appleToken, setAppleToken] = useState<string>(''); // 애플 토큰
  const [id, setId] = useState<string>(''); // 고유값

  // kakao login
  const Kakaologin = async (): Promise<void> => {
    await signInWithKakao();
  };
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    setLoading(true);
    await setToken(JSON.stringify(token.refreshToken));
    await setKakaoToken(
      JSON.stringify(token.refreshToken.replace('"', '').replace('"', '')),
    );
    await getProfile();
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement | KakaoProps =
      await getKakaoProfile();
    await setProfile(profile?.profileImageUrl);
    await setNickname(profile?.nickname);
    await setId(profile?.id);
    await setType('KAKAO');
    await mutationLoadUserWithToken();
  };

  // google login
  const onGoogleButtonPress = async (): Promise<void> => {
    setLoading(true);
    try {
      await GoogleSignin.configure({
        webClientId:
          '117535266053-q7r1c69g78o5o3vo9go1r6f3esphpr4r.apps.googleusercontent.com',
      });
      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      await firebase.auth().signInWithCredential(credential);
      await setToken(JSON.stringify(data.idToken));
      await setId(data.user.id);
      await setType('GOOGLE');
      await setProfile(data.user.photo);
      await setNickname(data.user.name);
      await setGoogleToken(data.idToken);
      await mutationLoadUserWithToken();
    } catch (e) {
      setLoading(false);
    }
  };

  // apple login

  const [mutationLoadUserWithToken] = useMutation(LOAD_USER_WITH_TOKEN, {
    // 유저가 있었는지 여부
    variables: {
      id,
      type,
    },
    onCompleted: async d => {
      console.log('결과' + JSON.stringify(d));
      if (d?.loadUserWithToken?.new) {
        await mutationInsertUser();
        return;
      } else {
        await mutationLogin();
      }
    },
    onError: () => {
      Alert.alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
      setLoading(false);
      console.log('아이디' + JSON.stringify(id));
      console.log('아이디' + JSON.stringify(id));
      console.log('아이디' + JSON.stringify(id));
      console.log('타입' + JSON.stringify(type));
      console.log('타입' + JSON.stringify(type));
      console.log('타입' + JSON.stringify(type));
    },
  });

  const [mutationInsertUser] = useMutation(INSERT_USER, {
    variables: {
      user: {
        nickname,
        profile,
        kakao_token: kakaoToken,
        google_token: googleToken,
        apple_token: appleToken,
        kakao_id: type === 'KAKAO' ? id : '',
        google_id: type === 'GOOGLE' ? String(id) : '',
        apple_id: type === 'APPLE' ? id : '',
      },
    },
    onCompleted: async d => {
      console.log('아이디' + JSON.stringify(id));
      console.log('아이디' + JSON.stringify(id));
      console.log('아이디' + JSON.stringify(id));
      console.log('타입' + JSON.stringify(type));
      console.log('타입' + JSON.stringify(type));
      console.log('타입' + JSON.stringify(type));
      await mutationLogin();
    },
    onError: () => {
      Alert.alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
      setLoading(false);
    },
  });

  const [mutationLogin] = useMutation(LOGIN, {
    variables: {
      id,
      type,
    },
    onCompleted: async d => {
      logUserIn(d?.login?.token);
      if (
        d?.login?.profile === null ||
        d?.login?.profile === '' ||
        d?.login?.profile === undefined
      ) {
        await GoToInputProfilePage(); // 프로필이 없다면 ..
      } else {
        await GoToHomePage(); // 프로필이 있다면 ..
      }
    },
    onError: () => {
      Alert.alert('로그인 오류가 발생했습니다.');
      setLoading(false);
    },
  });
  const GoToInputProfilePage = () => {
    navigation.reset({
      routes: [{name: 'InputProfile', params: {profile, nickname}}],
    });
  };
  const GoToHomePage = () => {
    navigation.reset({routes: [{name: 'Home', params: {}}]});
  };

  return (
    <>
      <LoginPresenter
        signInWithKakao={Kakaologin}
        signInWithGoogle={onGoogleButtonPress}
        loading={loading}
      />
    </>
  );
};

export default LoginContainer;
