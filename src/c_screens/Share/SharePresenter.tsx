import React from 'react';
import styled from 'styled-components/native';
import {Image, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast';

import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';
import RadioGroup from '@components/RadioButton';

const ShareButtonContainer = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[110]}px;
  background-color: #fff;
  padding: ${nomalizes[5]}px;
  padding-top: ${nomalizes[10]}px;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const ButtonWrapper = styled.TouchableOpacity`
  width: ${nomalizes[45]}px;
  height: ${nomalizes[70]}px;
  display: flex;
  flex-direction: column;
  margin-right: ${nomalizes[10]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #000;
  margin-top: ${nomalizes[5]}px;
  font-size: ${nomalizes[10]}px;
`;
const DesText = styled.Text`
  color: #757575;
  margin-left: ${nomalizes[5]}px;
  margin-top: ${nomalizes[5]}px;
  font-size: ${nomalizes[10]}px;
`;
const NeigorContainer = styled.View`
  margin-top: ${nomalizes[15]}px;
  width: ${cWidth}px;
  height: ${cHeight - nomalizes[110]}px;
  background-color: #fff;
`;
const NeigorContainerHeader = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[50]}px;
  padding-top: ${nomalizes[8]}px;
`;
const SelectWrapper = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[50]}px;
  padding-left: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
`;
const SelectWapperButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const SelectTextView = styled.View`
  flex: 9;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const SelectTextViewText = styled.Text`
  color: #000;
  margin-left: ${nomalizes[15]}px;
  font-size: ${nomalizes[12]}px;
`;
const SelectTextViewTextHeading = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #000;
`;
const Hr = styled.View`
  width: ${cWidth}px;
  height: 1px;
  background-color: #dbdbdb;
`;
const Submit = styled.TouchableOpacity<DisabledProps>`
  width: ${cWidth * 0.9}px;
  height: ${nomalizes[35]}px;
  border-radius: ${nomalizes[7]}px;
  display: flex;
  background-color: ${props => (props.disabled ? '#acacac' : '#ff6c63')};
  position: absolute;
  bottom: ${nomalizes[50]}px;
  left: ${cWidth * 0.05}px;
  ${cssUtil.doubleCenter};
`;
const SubmitText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[12]}px;
`;
const AlertWrapper = styled.View<SelectModalProps>`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[110]}px;
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
  font-weight: bold;
`;
const AlertSub = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #333333;
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
  background-color: #dbdbdb;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const OkButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #ff6258;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
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
const ModalButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;

interface Props {
  GoBack: () => void;
  handleClicked: (value: number) => void;
  userIds: any;
  kakaoshare: () => void;
  selectModal: boolean;
  cancelSelectModal: () => void;
  handleEvent: () => void;
  handleSubmit: () => void;
  toastRef: any;
}
interface DisabledProps {
  disabled: boolean;
}
interface SelectModalProps {
  selectModal: boolean;
}
const SharePresenter = ({
  GoBack,
  handleClicked,
  userIds,
  kakaoshare,
  selectModal,
  cancelSelectModal,
  handleEvent,
  handleSubmit,
  toastRef,
}: Props) => {
  return (
    <>
      <Header text="공유" back={GoBack} />
      <ShareButtonContainer>
        <ButtonContainer>
          <ButtonWrapper onPress={kakaoshare}>
            <Image
              style={{
                width: nomalizes[35],
                height: nomalizes[35],
              }}
              source={images.kakaoShare}
            />
            <ButtonText>카카오톡</ButtonText>
          </ButtonWrapper>
          <ButtonWrapper>
            <Image
              style={{
                width: nomalizes[35],
                height: nomalizes[35],
              }}
              source={images.pinkShare}
            />
            <ButtonText>전체나눔</ButtonText>
          </ButtonWrapper>
        </ButtonContainer>

        <DesText>
          {userIds.length > 0
            ? '*전체 나눔 선택 시, 이웃 모두에게 [나눔 시작] 으로 공유됩니다.'
            : '*전체 나눔 선택 시, 이웃 모두에게 ‘나눔합니다’ 알림을 보냅니다.'}
        </DesText>
      </ShareButtonContainer>
      <NeigorContainer>
        <NeigorContainerHeader>
          <SelectWrapper>
            <SelectWapperButtonWrapper />
            <SelectTextView>
              <SelectTextViewTextHeading>
                {userIds.length}개 선택됨
              </SelectTextViewTextHeading>
            </SelectTextView>
          </SelectWrapper>
        </NeigorContainerHeader>
        <Hr />
        <ScrollView>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activated={userIds.indexOf(1) !== -1}
                activeButton="하이루"
                onChange={() => handleClicked(1)}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activated={userIds.indexOf(2) !== -1}
                activeButton="asdf"
                onChange={() => handleClicked(2)}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activated={userIds.indexOf(3) !== -1}
                activeButton="asdf"
                onChange={() => handleClicked(3)}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
        </ScrollView>
      </NeigorContainer>
      <Submit onPress={handleSubmit} disabled={userIds?.length < 1}>
        <SubmitText>완료</SubmitText>
      </Submit>

      <Modal animationType="fade" visible={selectModal} transparent={true}>
        <ModalBackground>
          <AlertWrapper selectModal={selectModal}>
            <AlertText>전체 나눔을 시작합니다!</AlertText>
            <AlertSub>MY알림에서 기록을 확인할 수 있어요!</AlertSub>
            <SelectButtonWrapper>
              <CancelButton onPress={cancelSelectModal}>
                <ModalButtonText>취소</ModalButtonText>
              </CancelButton>
              <OkButton onPress={handleEvent}>
                <ModalButtonText>확인</ModalButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </AlertWrapper>
        </ModalBackground>
      </Modal>
      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.1}
        fadeInDuration={400}
        fadeOutDuration={1200}
      />
    </>
  );
};

export default SharePresenter;
