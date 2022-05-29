import React from 'react';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  height: ${nomalizes[35]}px;
  background-color: #fff;
  border: 1px solid #777777;
  border-radius: ${nomalizes[5]}px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const TTextInput = styled.TextInput`
  padding-left: ${nomalizes[10]}px;
  flex: 8;
  height: ${nomalizes[40]}px;
  font-size: ${nomalizes[12]}px;
  color: rgb(50, 50, 50);
`;
const LengthContainer = styled.View`
  flex: 2;
  height: ${nomalizes[40]}px;
  padding-right: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  color: RGB(50, 50, 50);
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
  maxLength: number;
  placeholder?: string;
}
const TextInput = ({value, setValue, maxLength, placeholder}: Props) => {
  return (
    <Container>
      <TTextInput
        placeholder={placeholder ? placeholder : '닉네임 입력'}
        placeholderTextColor="#646464"
        onChangeText={(text: string) => setValue(text)}
        value={value}
        maxLength={maxLength}
      />
      <LengthContainer>
        <TText>
          {value?.length ? value?.length : 0}/{maxLength}
        </TText>
      </LengthContainer>
    </Container>
  );
};

export default TextInput;
