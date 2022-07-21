import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {UserSearchData} from '~/types/User';
import {ScrollView} from 'react-native-gesture-handler';
import {SizedBox} from '~/c_components/SizedBox';

const Container = styled.View`
  flex: 1;
  padding: ${nomalizes[20]}px;
  padding-top: ${nomalizes[40]}px;
  background-color: white;
`;
const SearchResultContainer = styled.View`
  padding-top: ${nomalizes[20]}px;
`;
const SearchResultBox = styled.View`
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

interface Props {
  goBack: () => void;
  text: string;
  setText: (value: string) => void;
  userData: UserSearchData[];
}

const FriendAddPresenter = ({goBack, text, setText, userData}: Props) => {
  return (
    <>
      <Header text="이웃 추가하기" back={goBack} />
      <Container>
        <SearchInput
          value={text}
          setValue={(values: string) => setText(values)}
          placeholder="이웃명으로 검색하기"
          width={100}
          onSubmit={() => console.log('asdfasdf')}
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
                  <SearchResultBox>
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
    </>
  );
};

export default FriendAddPresenter;
