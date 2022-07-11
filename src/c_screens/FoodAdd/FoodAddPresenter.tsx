import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {cWidth, nomalizes} from '@utills/constants';
import {FoodData} from '~/types/Food';

const Container = styled.View`
  flex: 1;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: ${nomalizes[20]}px;
  background-color: #fff;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-bottom: ${nomalizes[10]}px;
  color: #000;
`;
const SearchResultBoxTextContainer = styled.ScrollView`
  width: 100%;
  margin-top: ${nomalizes[10]}px;
  display: flex;
  font-family: 'Pretendard';
  flex-direction: row;
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
`;
const SearchResultBoxTextWrapper = styled.TouchableOpacity`
  display: flex;
  width: ${cWidth * 0.85}px;
  height: ${nomalizes[16]}px;
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

interface Props {
  GoBack: () => void;
  handleSearch: () => void;
  value: string;
  handleChangeText: (value: string) => void;
  handleKeywordClick: (value: string) => void;
  results: FoodData[];
}

const FoodAddPresenter = ({
  GoBack,
  handleSearch,
  value,
  handleChangeText,
  handleKeywordClick,
  results,
}: Props) => {
  return (
    <>
      <Header text="식품 추가하기" back={GoBack} />
      <Container>
        <Heading>식품명</Heading>
        <SearchInput
          value={value}
          setValue={(values: string) => handleChangeText(values)}
          placeholder="식품명 검색하기"
          width={100}
          onSubmit={handleSearch}
        />
        <SearchResultBoxTextContainer>
          {results !== [] &&
            results.map((food: FoodData) => {
              return (
                <SearchResultBoxTextWrapper
                  onPress={() => handleKeywordClick(food?.name)}>
                  <SearchResultBoxText>{food?.name}</SearchResultBoxText>
                  <SearchResultBoxRemainText>
                    소비기한: {food?.date}일
                  </SearchResultBoxRemainText>
                </SearchResultBoxTextWrapper>
              );
            })}
        </SearchResultBoxTextContainer>
      </Container>
    </>
  );
};

export default FoodAddPresenter;
