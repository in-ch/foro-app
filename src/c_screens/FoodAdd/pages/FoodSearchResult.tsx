/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import Header from '@components/Header/Header';
import {RootTabParamList} from '@navigation/RootNavigation';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {SizedBox} from '@components/SizedBox';
import {FoodData} from '~/types/Food';
import {foods} from '~/data/FOOD';
import {getListFilter} from '~/utills/getListFilter';

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
  route: RouteProp<RootTabParamList, 'FoodSearchResult'>;
}

const FoodSearchResult = ({navigation, route}: FoodSearchResultProps) => {
  const GoToFoodAddInput = (text: string) => {
    navigation.navigate('FoodAddInput', {text});
  };
  const [results, setResults] = useState<FoodData | []>([]);
  useEffect(() => {
    setResults(getListFilter(foods, route.params.text));
  }, []);
  return (
    <Container>
      <Header text={route.params.text} back={() => navigation.goBack()} />
      <SizedBox.Custom margin={nomalizes[20]} />

      {results.map((food: FoodData) => {
        return (
          <SearchResultBox
            style={{borderBottomWidth: 1}}
            onPress={() => GoToFoodAddInput(food.name)}>
            <SearchResultBoxHeading>{food.name}</SearchResultBoxHeading>
            <SizedBox.Custom margin={nomalizes[5]} />
            <SearchResultBoxTextContainer>
              <SearchResultBoxText>식품 권장 기한</SearchResultBoxText>
              <SearchResultBoxNumber>{food.date}일</SearchResultBoxNumber>
            </SearchResultBoxTextContainer>
            <SearchResultBoxTextContainer>
              {food.keyword.map(keyword => {
                return (
                  <HashTag>
                    <HashTagText>{keyword}</HashTagText>
                  </HashTag>
                );
              })}
            </SearchResultBoxTextContainer>
          </SearchResultBox>
        );
      })}
    </Container>
  );
};

export default FoodSearchResult;
