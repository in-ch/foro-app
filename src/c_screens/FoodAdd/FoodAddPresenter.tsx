import React, {useState} from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import TextBox from '@components/TextBox';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  margin-top: ${nomalizes[8]}px;
  margin-bottom: ${nomalizes[8]}px;
  color: rgb(50, 50, 50);
`;

interface Props {
  GoBack: () => void;
  GoToFoodSearchResult: () => void;
}

const FoodAddPresenter = ({GoBack, GoToFoodSearchResult}: Props) => {
  const [text, setText] = useState<string>('');
  return (
    <>
      <Header text="식품 추가하기" back={GoBack} />
      <Container>
        <Heading>식품명</Heading>
        <SearchInput
          value={text}
          setValue={(value: string) => setText(value)}
          placeholder="식품명 검색하기"
          width={100}
        />
        <SearchRelateView>
          <TouchableWithoutFeedback onPress={GoToFoodSearchResult}>
            <SearchRelateViewText>식품명ab</SearchRelateViewText>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={GoToFoodSearchResult}>
            <SearchRelateViewText>식품명abc</SearchRelateViewText>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={GoToFoodSearchResult}>
            <SearchRelateViewText>식품명bcd</SearchRelateViewText>
          </TouchableWithoutFeedback>
        </SearchRelateView>
        <SizedBox.Custom margin={nomalizes[20]} />

        <Heading>등록일</Heading>
        <TextBox text="2022 / 05 / 08" />
      </Container>
    </>
  );
};

export default FoodAddPresenter;
