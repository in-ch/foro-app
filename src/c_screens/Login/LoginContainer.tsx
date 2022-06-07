/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
// @ts-nocheck

import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  KakaoOAuthToken,
  login,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import {useMutation} from '@apollo/client';
// import KakaoShareLink from 'react-native-kakao-share-link';

import {
  LOAD_USER_WITH_TOKEN,
  INSERT_USER,
  LOGIN,
} from '@services/mutations/user';
import LoginPresenter from './LoginPresenter';
import {RootTabParamList} from '../../navigation/RootNavigation';
import {logUserIn} from '../../apollo/apollo';
import {Alert} from 'react-native';
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
    setLoading(false);
  };

  const signInWithKakao = async (): Promise<void> => {
    // 토큰이 없다면 아래 코드 실행
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

  // apple login
  const GoToInputProfilePage = () => {
    navigation.reset('InputProfile', {});
  };
  const GoToHomePage = () => {
    navigation.reset('Home', {});
  };

  const [mutationLoadUserWithToken] = useMutation(LOAD_USER_WITH_TOKEN, {
    // 유저가 있었는지 여부
    variables: {
      id,
      type,
    },
    onCompleted: async d => {
      console.log(d?.loadUserWithToken?.new);
      if (d?.loadUserWithToken?.new) {
        // 로그인 한 적이 없다면
        console.log('로그인 실행');
        return;
      } else {
        console.log('유저 insert 실행 후 로그인 실행');
        await mutationInsertUser();
      }
    },
    onError: e => {
      Alert.alert('오류가 발생했습니다. 관리자에게 문의해주세요.');
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
        google_id: type === 'GOOGLE' ? id : '',
        apple_id: type === 'APPLE' ? id : '',
      },
    },
    onCompleted: async d => {
      console.log('아이디 : ' + id);
      console.log('결과 : ' + JSON.stringify(d));
      await mutationLogin();
    },
    onError: e => {
      console.log('에러' + JSON.stringify(e));
    },
  });

  const [mutationLogin] = useMutation(LOGIN, {
    variables: {
      token: token.replace('"', '').replace('"', ''),
      type,
      id,
    },
    onCompleted: d => {
      logUserIn(d.login.token);
      if (
        d?.login?.profile === null ||
        d?.login?.profile === '' ||
        d?.login?.profile === undefined
      ) {
        GoToInputProfilePage(); // 프로필이 없다면 ..
      } else {
        GoToHomePage(); // 프로필이 있다면 ..
      }
    },
    onError: e => {
      // 여기 토스트하나 만들어주기
      console.log('로그인 오류' + JSON.stringify(e));
    },
  });
  return (
    <>
      <LoginPresenter signInWithKakao={Kakaologin} loading={loading} />
    </>
  );
};

export default LoginContainer;
