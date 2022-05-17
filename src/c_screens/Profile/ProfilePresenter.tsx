/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const ProfileContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: ${nomalizes[30]}px;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled.View`
  width: 60%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
  margin-top: ${nomalizes[10]}px;
`;
const NicknameContainer = styled.View`
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
  height: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Nickname = styled.Text`
  font-size: ${nomalizes[12]}px;
  align-items: center;
  text-align: center;
  color: #575757;
`;
const Nim = styled.Text`
  font-size: ${nomalizes[14]}px;
  color: rgb(50, 50, 50);
`;
const EditContainer = styled.TouchableOpacity`
  height: ${nomalizes[25]}px;
`;
const EditText = styled.Text`
  margin-top: ${nomalizes[10]}px;
  font-size: ${nomalizes[12]}px;
  color: #575757;
`;
interface Props {
  goBack: () => void;
  goToProfileEdit: () => void;
}

const ProfilePresenter = ({goBack, goToProfileEdit}: Props) => {
  return (
    <Container>
      <Header text="프로필" back={goBack} />
      <ProfileContainer>
        <Image
          style={{
            width: nomalizes[50],
            height: nomalizes[50],
          }}
          source={images.user}
        />
        <TextContainer>
          <NicknameContainer
            style={{
              borderBottomColor: '#cacaca',
              borderBottomWidth: 1,
            }}>
            <Nickname>일이삼사오륙칠팔구십</Nickname>
          </NicknameContainer>
          <NicknameContainer>
            <Nim>님</Nim>
          </NicknameContainer>
        </TextContainer>
        <EditContainer
          style={{
            borderBottomColor: '#cacaca',
            borderBottomWidth: 1,
          }}
          onPress={goToProfileEdit}>
          <EditText>편집하기</EditText>
        </EditContainer>
      </ProfileContainer>
    </Container>
  );
};

export default ProfilePresenter;
