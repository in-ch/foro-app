/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import Images from 'assets';

const Container = styled.View<ContainerProps>`
  width: ${props => (props.widths ? props.widths : 90)}%;
  height: ${nomalizes[35]}px;
  background-color: #fff;
  border: 1px solid #777777;
  margin-left: ${props => (props.widths ? 100 - Number(props.widths) : 5)}%;
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
const LengthContainer = styled.TouchableOpacity`
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
  onSubmit?: () => void;
}
interface ContainerProps {
  widths: string;
}

const SearchInput = ({
  value,
  setValue,
  placeholder,
  width,
  onSubmit,
}: Props) => {
  return (
    <Container widths={width}>
      <TTextInput
        placeholder={placeholder ? placeholder : '검색하기'}
        placeholderTextColor="#646464"
        onChangeText={(text: string) => setValue(text)}
        value={value}
        maxLength={20}
        onSubmitEditing={onSubmit}
        style={{
          color: '#000',
        }}
      />
      <LengthContainer onPress={onSubmit}>
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

export default SearchInput;
