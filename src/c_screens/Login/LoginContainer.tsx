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
  getAccessToken,
  KakaoAccessTokenInfo,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(''); // 결과
  const [profile, setProfile] = useState<string>(''); // 유저 닉네임
  const [nickname, setNickname] = useState<string>(''); // 유저 프로필
  const [type, setType] = useState<string>(''); // 로그인 방법
  const [kakaoToken, setKakaoToken] = useState<string>(''); // 카카오 토큰
  const [googleToken, setGoogleToken] = useState<string>(''); // 구글 토큰
  const [appleToken, setAppleToken] = useState<string>(''); // 애플 토큰

  // kakao login
  const Kakaologin = async (): Promise<void> => {
    await signInWithKakao();
    setLoading(false);
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const existToken: KakaoAccessTokenInfo = await getAccessToken(); // 엑세스 토큰 조회
      console.log('엑세스 토큰' + JSON.stringify(existToken));
      await setToken(JSON.stringify(existToken.accessToken));
      await setKakaoToken(JSON.stringify(existToken.accessToken));
      await setType('KAKAO');
      if (existToken?.expiresIn < 1) {
        // expiresIn 만료 시 분기 처리 할 거 추가 작성
      } else {
        // expiredIn 만료 안됨. -> 로그인 정보 조회 후 로그인 실시
        await mutationLogin();
      }
    } catch (e) {
      // 토큰이 없다면 아래 코드 실행
      const token: KakaoOAuthToken = await login();
      setLoading(true);
      await setToken(JSON.stringify(token.accessToken));
      await setKakaoToken(
        JSON.stringify(token.accessToken.replace('"', '').replace('"', '')),
      );
      await getProfile();
      await mutationInsertUser();
    }
  };

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement | KakaoProps =
      await getKakaoProfile();
    setProfile(profile?.profileImageUrl);
    setNickname(profile?.nickname);
    setType('KAKAO');
  };

  // google login

  // apple login

  const GoToInputProfilePage = () => {
    navigation.navigate('InputProfile', {});
  };
  const GoToHomePage = () => {
    navigation.navigate('Home', {});
  };

  // const [mutationLoadUserWithToken] = useMutation(LOAD_USER_WITH_TOKEN, {
  //   // 유저가 있었는지 여부
  //   variables: {
  //     type,
  //     token,
  //   },
  //   onCompleted: d => {
  //     console.log(JSON.stringify(d));
  //     if (d?.loadUserWithToken?.length < 1) {
  //       // 로그인 한 적이 없다면
  //       return;
  //     } else if (d?.loadUserWithToken?.length > 0) {
  //       // 로그인 한 적이 있다면
  //       return;
  //     }
  //   },
  //   onError: e => {
  //     console.log('뭥미');
  //     console.log(JSON.stringify(e));
  //   },
  // });
  const kakao_token = kakaoToken.replace('"', '').replace('"', ''); // 카카오 토큰 쓸데없는 문자 제거
  const [mutationInsertUser] = useMutation(INSERT_USER, {
    variables: {
      user: {
        nickname,
        profile,
        kakao_token,
        google_token: googleToken,
        apple_token: appleToken,
      },
    },
    onCompleted: async () => {
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
