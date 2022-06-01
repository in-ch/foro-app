/* eslint-disable react-hooks/exhaustive-deps */
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

import LoginPresenter from './LoginPresenter';
import {hideBottomBar} from '../../apollo/apollo';
import {RootTabParamList} from '../../navigation/RootNavigation';

interface Props {
  navigation: NavigationProp<RootTabParamList, 'Home'>;
}
interface KakaoProps {
  nickname?: string;
  profileImageUrl?: string;
}

const LoginContainer = ({navigation}: Props) => {
  const [token, setToken] = useState<string>(''); // 결과
  const [profile, setProfile] = useState<string>(''); // 유저 닉네임
  const [nickname, setNickname] = useState<string>(''); // 유저 프로필

  // kakao login
  const Kakaologin = async (): Promise<void> => {
    await signInWithKakao();
    await getProfile();
  };

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    await setToken(JSON.stringify(token.accessToken));
  };
  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement | KakaoProps =
      await getKakaoProfile();
    setProfile(profile?.profileImageUrl);
    setNickname(profile?.nickname);
  };

  // google login

  // apple login

  const GoToEmailPage = () => {
    navigation.navigate('InputProfile', {});
  };
  useEffect(() => {
    hideBottomBar(false);
  }, []);

  useEffect(() => {
    console.log('결과' + JSON.stringify(token));
    console.log('결과' + JSON.stringify(profile));
    console.log('결과' + JSON.stringify(nickname));
  }, [profile, nickname]);

  return (
    <>
      <LoginPresenter
        GoToEmailPage={GoToEmailPage}
        signInWithKakao={Kakaologin}
      />
    </>
  );
};

export default LoginContainer;
