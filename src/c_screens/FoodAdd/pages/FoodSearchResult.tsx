/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import Header from '@components/Header/Header';
import {RootTabParamList} from '@navigation/RootNavigation';
import {NavigationProp} from '@react-navigation/native';
import {SizedBox} from '@components/SizedBox';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const SearchResultBox = styled.TouchableOpacity`
  width: 90%;
  margin-left: 5%;
  height: ${nomalizes[80]}px;
  margin-top: ${nomalizes[10]}px;
  padding-bottom: ${nomalizes[10]}px;
  border-bottom-color: #dbdbdb;
`;
const SearchResultBoxHeading = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: rgb(50, 50, 50);
`;
const SearchResultBoxTextContainer = styled.View`
  height: ${nomalizes[16]}px;
  margin-top: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
`;
const SearchResultBoxText = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: rgb(50, 50, 50);
`;
const SearchResultBoxNumber = styled.Text`
  font-size: ${nomalizes[11]}px;
  margin-left: ${nomalizes[5]}px;
  color: #ff6c63;
`;
const HashTag = styled.View`
  height: ${nomalizes[16]}px;
  padding-left: ${nomalizes[5]}px;
  padding-right: ${nomalizes[5]}px;
  background-color: #f5f5f5;
  display: flex;
  margin-right: ${nomalizes[5]}px;
  border-radius: ${nomalizes[4]}px;
  ${cssUtil.doubleCenter};
`;
const HashTagText = styled.Text`
  font-size: ${nomalizes[8]}px;
  color: #757575;
`;

export interface FoodSearchResultProps {
  navigation: NavigationProp<RootTabParamList, 'FoodSearchResult'>;
}

const FoodSearchResult = ({navigation}: FoodSearchResultProps) => {
  const GoToFoodAddInput = (text: string) => {
    navigation.navigate('FoodAddInput', {text});
  };
  return (
    <Container>
      <Header text="토마토" back={() => navigation.goBack()} />
      <SizedBox.Custom margin={nomalizes[20]} />
      <SearchResultBox
        style={{borderBottomWidth: 1}}
        onPress={() => GoToFoodAddInput('토마토')}>
        <SearchResultBoxHeading>토마토</SearchResultBoxHeading>
        <SizedBox.Custom margin={nomalizes[5]} />
        <SearchResultBoxTextContainer>
          <SearchResultBoxText>식품 권장 기한</SearchResultBoxText>
          <SearchResultBoxNumber>14일</SearchResultBoxNumber>
        </SearchResultBoxTextContainer>
        <SearchResultBoxTextContainer>
          <HashTag>
            <HashTagText>신선식품</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>상온보관</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>비조리 섭취 금지</HashTagText>
          </HashTag>
        </SearchResultBoxTextContainer>
      </SearchResultBox>
      <SearchResultBox
        style={{borderBottomWidth: 1}}
        onPress={() => GoToFoodAddInput('토마토')}>
        <SearchResultBoxHeading>토마토 무침</SearchResultBoxHeading>
        <SizedBox.Custom margin={nomalizes[5]} />
        <SearchResultBoxTextContainer>
          <SearchResultBoxText>식품 권장 기한</SearchResultBoxText>
          <SearchResultBoxNumber>14일</SearchResultBoxNumber>
        </SearchResultBoxTextContainer>
        <SearchResultBoxTextContainer>
          <HashTag>
            <HashTagText>신선식품</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>상온보관</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>비조리 섭취 금지</HashTagText>
          </HashTag>
        </SearchResultBoxTextContainer>
      </SearchResultBox>
      <SearchResultBox
        style={{borderBottomWidth: 1}}
        onPress={() => GoToFoodAddInput('토마토')}>
        <SearchResultBoxHeading>방울 토마토</SearchResultBoxHeading>
        <SizedBox.Custom margin={nomalizes[5]} />
        <SearchResultBoxTextContainer>
          <SearchResultBoxText>식품 권장 기한</SearchResultBoxText>
          <SearchResultBoxNumber>14일</SearchResultBoxNumber>
        </SearchResultBoxTextContainer>
        <SearchResultBoxTextContainer>
          <HashTag>
            <HashTagText>신선식품</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>상온보관</HashTagText>
          </HashTag>
          <HashTag>
            <HashTagText>비조리 섭취 금지</HashTagText>
          </HashTag>
        </SearchResultBoxTextContainer>
      </SearchResultBox>
    </Container>
  );
};

export default FoodSearchResult;
