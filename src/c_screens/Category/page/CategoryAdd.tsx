import React, {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import {RootTabParamList} from '@navigation/RootNavigation';
import HeaderPlus from '@components/Header/HeaderPlus';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import SearchInputOneLine from '@components/SearchInputOneLine';
import SelectInputNoBorder from '@components/SelectInputNoBorder';
export interface CategoryAddProps {
  navigation: NavigationProp<RootTabParamList, 'CategoryAdd'>;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const RowBox = styled.View`
  width: 100%;
  min-height: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

interface ColorProps {
  color: string;
}

const CategoryAdd = ({navigation}: CategoryAddProps) => {
  const [value, setValue] = useState('');
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Container>
      <HeaderPlus text="카테고리 추가" back={goBack} />
      <SizedBox.Custom margin={nomalizes[10]} />
      <SearchInputOneLine
        value={value}
        setValue={setValue}
        placeholder="카테고리 이름 입력"
      />
      <SizedBox.Custom margin={nomalizes[15]} />
      <RowBox>
        <Row>
          <SelectInputNoBorder />
        </Row>
      </RowBox>
    </Container>
  );
};

export default CategoryAdd;
