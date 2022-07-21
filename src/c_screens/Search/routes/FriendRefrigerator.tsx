import React, {useState} from 'react';
import styled from 'styled-components/native';

import SearchInput from '@components/SearchInput';
import {SizedBox} from '@components/SizedBox';
import {cWidth, nomalizes} from '@utills/constants';
import {ScrollView} from 'react-native-gesture-handler';

const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
  margin-top: ${nomalizes[20]}px;
  min-height: ${nomalizes[40]}px;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[13]}px;
  margin-bottom: ${nomalizes[15]}px;
  color: #272727;
  font-family: 'Pretendard';
`;
const SearchResultBoxTextWrapper = styled.TouchableOpacity`
  display: flex;
  width: ${cWidth * 0.85}px;
  height: ${nomalizes[16]}px;
  margin-left: ${nomalizes[5]}px;
  margin-bottom: ${nomalizes[10]}px;
  font-family: 'Pretendard';
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SearchResultBoxText = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: rgb(50, 50, 50);
  font-family: 'Pretendard';
`;
const SearchResultBoxRemainText = styled.Text`
  font-size: ${nomalizes[9]}px;
  color: rgb(109, 109, 109);
  font-family: 'Pretendard';
`;

const FriendRefrigerator = () => {
  const [text, setText] = useState<string>('');
  return (
    <>
      <SizedBox.Custom margin={nomalizes[30]} />
      <SearchInput value={text} setValue={(value: string) => setText(value)} />
      <ScrollView>
        <Wrapper>
          <Heading>이웃 01</Heading>
          <SearchResultBoxTextWrapper>
            <SearchResultBoxText>어떠한 음식</SearchResultBoxText>
            <SearchResultBoxRemainText>
              소비기한: 22일
            </SearchResultBoxRemainText>
          </SearchResultBoxTextWrapper>
          <SearchResultBoxTextWrapper>
            <SearchResultBoxText>어떠한 음식</SearchResultBoxText>
            <SearchResultBoxRemainText>
              소비기한: 22일
            </SearchResultBoxRemainText>
          </SearchResultBoxTextWrapper>
          <SearchResultBoxTextWrapper>
            <SearchResultBoxText>어떠한 음식</SearchResultBoxText>
            <SearchResultBoxRemainText>
              소비기한: 22일
            </SearchResultBoxRemainText>
          </SearchResultBoxTextWrapper>
        </Wrapper>
        <Wrapper>
          <Heading>이웃 02</Heading>
          <SearchResultBoxTextWrapper>
            <SearchResultBoxText>어떠한 음식</SearchResultBoxText>
            <SearchResultBoxRemainText>
              소비기한: 22일
            </SearchResultBoxRemainText>
          </SearchResultBoxTextWrapper>
        </Wrapper>
        <SizedBox.Custom margin={nomalizes[100]} />
      </ScrollView>
    </>
  );
};

export default FriendRefrigerator;
