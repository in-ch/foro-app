import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Modal} from 'react-native';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation} from '@apollo/client';
import Toast from 'react-native-easy-toast';

import {RootTabParamList} from 'navigation/RootNavigation';
import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {SizedBox} from '@components/SizedBox';
import {UserSearchData} from 'types/User';
import {LOAD_USER_BY_NAME} from '@services/mutations/user';
import images from '~/assets/images';

const Container = styled.View`
  flex: 1;
  padding: ${nomalizes[20]}px;
  padding-top: ${nomalizes[10]}px;
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
const NoneContainer = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const NoneText = styled.Text`
  margin-top: ${nomalizes[10]}px;
  color: #a8a8a8;
  font-size: ${nomalizes[12]}px;
`;

export interface FriendAddResultProps {
  navigation: NavigationProp<RootTabParamList, 'FriendAddResult'>;
  route: RouteProp<RootTabParamList, 'FriendAddResult'>;
}

interface SelectModalProps {
  selectModal: boolean;
}

const FriendAddResult = ({navigation, route}: FriendAddResultProps) => {
  const [userData, setUserData] = useState<UserSearchData[]>([]);
  const [selectModal, setSelectModal] = useState<boolean>(false);

  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [mutationLoadUserByName] = useMutation(LOAD_USER_BY_NAME, {
    variables: {
      nickname: route.params.foodText,
    },
    onCompleted: d => {
      setUserData(d?.loadUserByName);
    },
  });
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    mutationLoadUserByName();
  }, [mutationLoadUserByName]);

  const onClickUser = (userName: string) => {
    setSelectedUserName(userName);
    setSelectModal(true);
  };
  const toastRef = useRef<any>(null);
  const showToast = useCallback((modalText: string) => {
    toastRef.current.show(modalText);
  }, []);
  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const handleEvent = () => {
    showToast('이웃추가 요청을 보냈습니다.');
    setSelectModal(false);
  };

  return (
    <>
      <Header text={`${route.params.foodText} 검색 결과`} back={goBack} />
      <Container>
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
                  <SearchResultBox onPress={() => onClickUser(user.nickname)}>
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
            {userData.length < 1 && (
              <NoneContainer>
                <Image
                  style={{
                    width: nomalizes[50],
                    height: nomalizes[50],
                  }}
                  source={images.noSearch}
                />
                <NoneText>검색 결과가 없습니다.</NoneText>
              </NoneContainer>
            )}
          </SearchResultContainer>
          <SizedBox.Custom margin={nomalizes[100]} />
        </ScrollView>

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
      </Container>
    </>
  );
};

export default FriendAddResult;
