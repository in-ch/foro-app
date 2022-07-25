import React from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {SizedBox} from '@components/SizedBox';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {UserSearchData} from '~/types/User';
import {cssUtil} from '~/utills/cssUtil';
import Toast from 'react-native-easy-toast';

const Container = styled.View`
  flex: 1;
  padding: ${nomalizes[20]}px;
  padding-top: ${nomalizes[40]}px;
  background-color: white;
`;
const SearchResultContainer = styled.View`
  padding-top: ${nomalizes[20]}px;
`;
const SearchResultBox = styled.TouchableOpacity`
  width: 100%;
  height: ${nomalizes[40]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ProfileContainer = styled.View`
  height: ${nomalizes[40]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProfileText = styled.Text`
  color: #313131;
  font-size: ${nomalizes[11]}px;
  margin-left: ${nomalizes[10]}px;
`;
const IImage = styled.Image`
  width: ${nomalizes[30]}px;
  height: ${nomalizes[30]}px;
  border-radius: ${nomalizes[15]}px;
`;
const CreatedText = styled.Text`
  color: #313131;
  font-size: ${nomalizes[8]}px;
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
interface Props {
  goBack: () => void;
  text: string;
  setText: (value: string) => void;
  userData: UserSearchData[];
  toastRef: any;
  selectModal: boolean;
  setSelectModal: (value: boolean) => void;
  cancelSelectModal: () => void;
  handleEvent: () => void;
  selectedUserName: string;
  onClickUser: (value: string, value2: number) => void;
  goToFriendAddResult: () => void;
}
interface SelectModalProps {
  selectModal: boolean;
}

const FriendAddPresenter = ({
  goBack,
  text,
  setText,
  userData,
  toastRef,
  selectModal,
  cancelSelectModal,
  handleEvent,
  selectedUserName,
  onClickUser,
  goToFriendAddResult,
}: Props) => {
  return (
    <>
      <Header text="이웃 추가하기" back={goBack} />
      <Container>
        <SearchInput
          value={text}
          setValue={(values: string) => setText(values)}
          placeholder="이웃명으로 검색하기"
          width={100}
          onSubmit={goToFriendAddResult}
        />
        <ScrollView>
          <SearchResultContainer>
            {userData &&
              userData.map((user: UserSearchData) => {
                let date =
                  new Date(user.createdAt).getFullYear() +
                  '년 ' +
                  new Date(user.createdAt).getMonth() +
                  '월 ' +
                  new Date(user.createdAt).getDate() +
                  '일 생성';
                return (
                  <SearchResultBox
                    onPress={() => onClickUser(user.nickname, user.no)}>
                    <ProfileContainer>
                      <IImage
                        source={{
                          uri: user.profile,
                        }}
                      />
                      <ProfileText>{user.nickname}</ProfileText>
                    </ProfileContainer>
                    <CreatedText>{String(date)}</CreatedText>
                  </SearchResultBox>
                );
              })}
          </SearchResultContainer>
          <SizedBox.Custom margin={nomalizes[100]} />
        </ScrollView>
      </Container>

      <Modal animationType="fade" visible={selectModal} transparent={true}>
        <ModalBackground>
          <AlertWrapper selectModal={selectModal}>
            <AlertText>{selectedUserName}님에게</AlertText>
            <AlertSub>이웃추가 요청을 보내시겠습니까?</AlertSub>
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

export default FriendAddPresenter;
