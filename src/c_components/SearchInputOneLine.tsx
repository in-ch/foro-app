/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import Images from 'assets';

const Container = styled.View`
  width: 95%;
  height: ${nomalizes[35]}px;
  background-color: #fff;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
  border-radius: ${nomalizes[5]}px;
  ${cssUtil.doubleCenter};
`;
const TTextInput = styled.TextInput`
  padding-left: ${nomalizes[10]}px;
  flex: 9;
  height: ${nomalizes[40]}px;
  font-size: ${nomalizes[14]}px;
  color: RGB(50, 50, 50);
`;
const LengthContainer = styled.View`
  flex: 1;
  height: ${nomalizes[40]}px;
  padding-right: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  width?: number;
}

const SearchInputOneLine = ({value, setValue, placeholder}: Props) => {
  return (
    <Container
      style={{
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
      }}>
      <TTextInput
        placeholder={placeholder ? placeholder : '검색하기'}
        placeholderTextColor="#646464"
        onChangeText={(text: string) => setValue(text)}
        value={value}
        maxLength={20}
      />
      <LengthContainer>
        <Image
          style={{
            width: nomalizes[20],
            height: nomalizes[20],
          }}
          source={Images.search}
        />
      </LengthContainer>
    </Container>
  );
};

export default SearchInputOneLine;
