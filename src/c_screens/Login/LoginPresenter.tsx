import React, {useEffect, useState} from 'react';
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
  display: flex;
  ${cssUtil.doubleCenter};
`;
const PhoneButton = styled.TouchableOpacity`
  width: 80%;
  height: ${nomalizes[40]}px;
  border-radius: ${nomalizes[10]}px;
  background-color: #f5f5f5;
  margin-bottom: ${nomalizes[10]}px;
  border: 1px solid #b1b1b1;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  margin-left: ${nomalizes[10]}px;
  color: rgb(50, 50, 50);
`;
const Heading = styled.Text`
  color: #8f8f8f;
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[20]}px;
`;
const Heading2 = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-top: ${nomalizes[3]}px;
  color: #4d4d4d;
`;
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
interface Props {
  GoToEmailPage: () => void;
}

const LoginPresenter = ({GoToEmailPage}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
              <PhoneButton
                onPress={() => {
                  GoToEmailPage();
                }}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.kakao}
                />
                <TText>카카오로 로그인</TText>
              </PhoneButton>
              <PhoneButton
                onPress={() => {
                  GoToEmailPage();
                }}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.google}
                />
                <TText>구글로 로그인</TText>
              </PhoneButton>
              <PhoneButton
                onPress={() => {
                  GoToEmailPage();
                }}>
                <Image
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.apple}
                />
                <TText>애플로 로그인</TText>
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
