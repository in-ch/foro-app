import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import styled from 'styled-components/native';

import {SizedBox} from '@components/SizedBox';
import {cHeight, cWidth, nomalizes, statusBarHeight} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

import Images from 'assets';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex: 1;
  position: relative;
`;
const IntroJon = styled.View`
  width: 100%;
  height: ${nomalizes[200]}px;
  display: flex;
  top: ${nomalizes[30]}px;
  ${cssUtil.doubleCenter};
`;
const LoginJon = styled.View`
  width: 100%;
  height: ${cHeight < 720 ? nomalizes[100] : nomalizes[200]}px;
  margin-top: ${cHeight < 720 ? nomalizes[50] : nomalizes[150]}px;
  position: absolute;
  bottom: ${nomalizes[30]}px;
  ${cssUtil.doubleCenter};
`;
const PhoneButton = styled.TouchableOpacity<ButtonProps>`
  width: 80%;
  height: ${nomalizes[35]}px;
  border-radius: ${nomalizes[10]}px;
  background-color: ${props => props.background};
  margin-bottom: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  padding-left: ${nomalizes[20]}px;
  align-items: center;
`;
const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-right: ${nomalizes[45]}px;
`;
const TText = styled.Text<TextProps>`
  margin-left: ${nomalizes[10]}px;
  color: ${props => props.color};
  font-family: 'Pretendard';
`;
const Heading = styled.Text`
  color: #8f8f8f;
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[20]}px;
  font-family: 'Pretendard';
`;
const Heading2 = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-top: ${nomalizes[3]}px;
  color: #4d4d4d;
  font-family: 'Pretendard';
`;
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
interface Props {
  signInWithKakao: () => void;
  signInWithGoogle: () => void;
  signInWithApple: () => void;
  loading: boolean;
}
interface TextProps {
  color: string;
}
interface ButtonProps {
  background: string;
}

const LoginPresenter = ({
  signInWithKakao,
  signInWithGoogle,
  signInWithApple,
  loading,
}: Props) => {
  return (
    <>
      {!loading ? (
        <>
          <Container>
            <SizedBox.Custom margin={statusBarHeight} />
            <IntroJon>
              <Image
                style={{
                  width: nomalizes[50],
                  height: nomalizes[50],
                }}
                source={Images.logo}
              />
              <Heading>푸드 제로</Heading>
              <Heading2>이웃과 음식을 나눠 보세요.</Heading2>
            </IntroJon>
            <LoginJon>
              <PhoneButton background={'#FEE501'} onPress={signInWithKakao}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.kakao}
                />
                <TextContainer>
                  <TText color="#272727">카카오로 로그인</TText>
                </TextContainer>
              </PhoneButton>
              <PhoneButton background={'#F45A5D'} onPress={signInWithGoogle}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.google}
                />
                <TextContainer>
                  <TText color="#fff">구글로 로그인</TText>
                </TextContainer>
              </PhoneButton>
              <PhoneButton background={'#000'} onPress={signInWithApple}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.apple}
                />
                <TextContainer>
                  <TText color="#fff">애플로 로그인</TText>
                </TextContainer>
              </PhoneButton>
            </LoginJon>
          </Container>
        </>
      ) : (
        <>
          <LoadingContainer>
            <ActivityIndicator animating={true} size="small" color="#000" />
          </LoadingContainer>
        </>
      )}
    </>
  );
};

export default LoginPresenter;
