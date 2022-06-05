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

import KakaoShareLink from 'react-native-kakao-share-link';

// const kakaoshare = async () => {
//   try {
//     const response = await KakaoShareLink.sendCommerce({
//       content: {
//         title: 'title',
//         imageUrl:
//           'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
//         link: {
//           webUrl: 'https://developers.kakao.com/',
//           mobileWebUrl: 'https://developers.kakao.com/',
//         },
//         description: 'description',
//       },
//       commerce: {
//         regularPrice: 100000,
//         discountPrice: 80000,
//         discountRate: 20,
//       },
//       buttons: [
//         {
//           title: '앱에서 보기',
//           link: {
//             androidExecutionParams: [{key: 'key1', value: 'value1'}],
//             iosExecutionParams: [
//               {key: 'key1', value: 'value1'},
//               {key: 'key2', value: 'value2'},
//             ],
//           },
//         },
//         {
//           title: '웹에서 보기',
//           link: {
//             webUrl: 'https://developers.kakao.com/',
//             mobileWebUrl: 'https://developers.kakao.com/',
//           },
//         },
//       ],
//     });
//     console.log(response);
//   } catch (e) {
//     console.error(e);
//     console.error(e.message);
//   }
// };
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
