import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';

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

interface Props {
  GoBack: () => void;
  handleSearch: () => void;
  value: string;
  setValue: (value: string) => void;
}

const FoodAddPresenter = ({GoBack, handleSearch, value, setValue}: Props) => {
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
        <SizedBox.Custom margin={nomalizes[20]} />
      </Container>
    </>
  );
};

export default FoodAddPresenter;
