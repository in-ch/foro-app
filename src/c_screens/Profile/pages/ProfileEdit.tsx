/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-gesture-handler';

import Header from '@components/Header/Header';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {RootTabParamList} from '@navigation/RootNavigation';
import {NavigationProp} from '@react-navigation/native';

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
  width: 90%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${nomalizes[10]}px;
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
`;
const WarningContainer = styled.View`
  width: 90%;
  height: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${nomalizes[5]}px;
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
`;
const RedText = styled.Text`
  color: #ee1e1e;
`;
const GreenText = styled.Text`
  color: #019c11;
`;
export interface ProfileEditProps {
  navigation: NavigationProp<RootTabParamList, 'ProfileEdit'>;
}

const ProfileEdit = ({navigation}: ProfileEditProps) => {
  const [text, setText] = useState<string>('');
  return (
    <Container>
      <Header text="프로필 편집" back={() => navigation.goBack()} />
      <ProfileContainer>
        <Image
          style={{
            width: nomalizes[50],
            height: nomalizes[50],
          }}
          source={images.user}
        />
        <TextContainer
          style={{
            borderBottomColor: '#cacaca',
            borderBottomWidth: 1,
          }}>
          <TextInput
            placeholder="닉네임 입력 공간"
            placeholderTextColor="#646464"
            maxLength={10}
            value={text}
            onChangeText={() => setText(text)}
          />
          <Text>{text?.length}/10</Text>
        </TextContainer>
        <WarningContainer>
          <RedText>*이미 사용중인 닉네임입니다.</RedText>
        </WarningContainer>
        <WarningContainer>
          <GreenText>사용할 수 있는 닉네임입니다.</GreenText>
        </WarningContainer>
      </ProfileContainer>
    </Container>
  );
};

export default ProfileEdit;
