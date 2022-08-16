import React from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {SizedBox} from '@components/SizedBox';
import {
  cHeight,
  cWidth,
  isIOS,
  nomalizes,
  statusBarHeight,
} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

import Images from 'assets';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #ff6258;
  flex: 1;
  position: relative;
`;
const IntroJon = styled.View`
  width: 100%;
  height: ${nomalizes[200]}px;
  display: flex;
  top: ${nomalizes[50]}px;
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
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;

const AlertWrapper = styled.View<SelectModalProps>`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[120]}px;
  border-radius: ${nomalizes[20]}px;
  display: ${props => (props.selectModal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: ${nomalizes[10]}px;
  position: absolute;
  top: ${cHeight / 2 - nomalizes[45]}px;
  left: ${cWidth / 2 - nomalizes[100]}px;
  justify-content: space-between;
`;
const AlertText = styled.Text`
  color: #333333;
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[5]}px;
`;
const AlertText2 = styled.Text`
  color: #8f8f8f;
  font-size: ${nomalizes[10]}px;
  margin-top: ${nomalizes[5]}px;
`;

const SelectButtonWrapper = styled.View`
  width: 90%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CancelButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #ff6258;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const OkButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #dbdbdb;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;
const GuestText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[12]}px;
  margin-bottom: ${nomalizes[20]}px;
`;
const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${nomalizes[30]}px;
  position: absolute;
  top: 0px;
  right: 0px;
  flex-direction: row;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[40]}px;
  justify-content: flex-end;
  align-items: flex-end;
`;
const IImage = styled.Image``;
const AActivityIndicator = styled.ActivityIndicator``;
const MModal = styled.Modal``;

interface Props {
  signInWithKakao: () => void;
  signInWithGoogle: () => void;
  signInWithApple: () => void;
  loading: boolean;
  selectModal: boolean;
  handleEvent: () => void;
  handleCancel: () => void;
  handleGuestLogin: () => void;
}
interface TextProps {
  color: string;
}
interface ButtonProps {
  background: string;
}
interface SelectModalProps {
  selectModal: boolean;
}

const LoginPresenter = ({
  signInWithKakao,
  signInWithGoogle,
  signInWithApple,
  loading,
  selectModal,
  handleEvent,
  handleCancel,
  handleGuestLogin,
}: Props) => {
  return (
    <>
      {!loading ? (
        <>
          <Container>
            <SizedBox.Custom margin={statusBarHeight} />
            <IntroJon>
              <IImage
                style={{
                  width: nomalizes[90],
                  height: nomalizes[120],
                }}
                source={Images.logo}
              />
            </IntroJon>
            <LoginJon>
              <TouchableWithoutFeedback onPress={handleGuestLogin}>
                <GuestText>Guest로 로그인</GuestText>
              </TouchableWithoutFeedback>

              <PhoneButton background={'#FEE501'} onPress={signInWithKakao}>
                <IImage
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
              <PhoneButton background={'#fff'} onPress={signInWithGoogle}>
                <IImage
                  style={{
                    width: nomalizes[25],
                    height: nomalizes[25],
                  }}
                  source={Images.google}
                />
                <TextContainer>
                  <TText color="#F45A5D">구글로 로그인</TText>
                </TextContainer>
              </PhoneButton>

              {isIOS && (
                <PhoneButton background={'#000'} onPress={signInWithApple}>
                  <IImage
                    style={{
                      width: nomalizes[25],
                      height: nomalizes[25],
                    }}
                    source={Images.apple}
                  />
                  <TextContainer>
                    <TText color="#fff">Apple로 로그인</TText>
                  </TextContainer>
                </PhoneButton>
              )}
            </LoginJon>
          </Container>
        </>
      ) : (
        <>
          <LoadingContainer>
            <AActivityIndicator animating={true} size="small" color="#000" />
          </LoadingContainer>
        </>
      )}
      <MModal animationType="fade" visible={selectModal} transparent={true}>
        <ModalBackground>
          <AlertWrapper selectModal={selectModal}>
            <AlertText>게스트로 로그인하시겠습니까?</AlertText>
            <AlertText2>로그아웃 시 정보는 저장되지 않습니다.</AlertText2>
            <SelectButtonWrapper>
              <CancelButton onPress={handleCancel}>
                <ButtonText>취소</ButtonText>
              </CancelButton>
              <OkButton onPress={handleEvent}>
                <ButtonText>확인</ButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </AlertWrapper>
        </ModalBackground>
      </MModal>
    </>
  );
};

export default LoginPresenter;
