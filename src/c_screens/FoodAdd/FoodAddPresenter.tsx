import React from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
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
const SearchRelateView = styled.View`
  width: 100%;
`;
const SearchRelateViewText = styled.Text`
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[12]}px;
  margin-bottom: ${nomalizes[8]}px;
  color: rgb(50, 50, 50);
`;

interface Props {
  GoBack: () => void;
  GoToFoodSearchResult: () => void;
  handleSearch: () => void;
  value: string;
  setValue: (value: string) => void;
  results: FoodData | [];
}

const FoodAddPresenter = ({
  GoBack,
  GoToFoodSearchResult,
  handleSearch,
  value,
  setValue,
  results,
}: Props) => {
  return (
    <>
      <Header text="식품 추가하기" back={GoBack} />
      <Container>
        <Heading>식품명</Heading>
        <SearchInput
          value={value}
          setValue={(values: string) => setValue(values)}
          placeholder="식품명 검색하기"
          width={100}
          onSubmit={handleSearch}
        />
        <SearchRelateView>
          {results &&
            results?.map((food: {name: React.ReactNode}) => {
              return (
                <TouchableWithoutFeedback onPress={GoToFoodSearchResult}>
                  <SearchRelateViewText>{food.name}</SearchRelateViewText>
                </TouchableWithoutFeedback>
              );
            })}
        </SearchRelateView>
        <SizedBox.Custom margin={nomalizes[20]} />
      </Container>
    </>
  );
};

export default FoodAddPresenter;
