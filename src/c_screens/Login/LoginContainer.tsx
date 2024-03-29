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
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {firebase} from '@react-native-firebase/auth';
import {useMutation, useReactiveVar} from '@apollo/client';
import {Alert} from 'react-native';

import {
  LOAD_USER_WITH_TOKEN,
  INSERT_USER,
  LOGIN,
} from '@services/mutations/user';
import LoginPresenter from './LoginPresenter';
import {RootTabParamList} from '../../navigation/RootNavigation';
import {IntroSkip, logUserIn, tokenUserNo} from '../../apollo/client';
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

  const [selectModal, setSelectModal] = useState<boolean>(false);

  const userNo = useReactiveVar(tokenUserNo);

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
  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      // 애플 로그인 인증 완료
      await setToken(appleAuthRequestResponse.identityToken);
      await setId(appleAuthRequestResponse.user);
      await setAppleToken(appleAuthRequestResponse.identityToken);
      await setType('APPLE');
      await setNickname(
        appleAuthRequestResponse.fullName?.nickname
          ? appleAuthRequestResponse.fullName?.nickname
          : `User${Math.floor(Math.random() * 1000000)}`,
      );
      await mutationLoadUserWithToken();
    } else {
      Alert.alert('로그인에 실패하였습니다.');
    }
  };

  const [mutationLoadUserWithToken] = useMutation(LOAD_USER_WITH_TOKEN, {
    // 유저가 있었는지 여부
    variables: {
      id,
      type,
    },
    onCompleted: async d => {
      if (d?.loadUserWithToken?.new) {
        await mutationInsertUser();
        return;
      } else {
        await mutationLogin();
      }
    },
    onError: e => {
      Alert.alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
      console.log(JSON.stringify(e));
      setLoading(false);
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
        guest_id: type === 'GUEST' ? id : '',
      },
    },
    onCompleted: async () => {
      await mutationLogin();
    },
    onError: e => {
      Alert.alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
      console.log(JSON.stringify(e));
      setLoading(false);
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
    onError: e => {
      Alert.alert('로그인 오류가 발생했습니다.');
      console.log(JSON.stringify(e));
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
  const handleGuestLogin = () => {
    setSelectModal(true);
  };
  const handleEvent = async () => {
    await setNickname('Guest' + Math.floor(Math.random() * 101000));
    await setId(String(Math.floor(Math.random() * 101000)));
    await setType('GUEST');
    mutationInsertUser();
  };
  const handleCancel = () => {
    setSelectModal(false);
  };

  /**
   * 인트로 부분
   */

  const inTroskip = useReactiveVar(IntroSkip);

  return (
    <>
      <LoginPresenter
        signInWithKakao={Kakaologin}
        signInWithGoogle={onGoogleButtonPress}
        signInWithApple={onAppleButtonPress}
        loading={loading}
        selectModal={selectModal}
        handleEvent={handleEvent}
        handleCancel={handleCancel}
        handleGuestLogin={handleGuestLogin}
        inTroskip={inTroskip}
      />
    </>
  );
};

export default LoginContainer;
