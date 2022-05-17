import React from 'react';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  width: 90%;
  height: ${nomalizes[40]}px;
  background-color: #fff;
  border: 1px solid #777777;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;
const TTextInput = styled.TextInput`
  padding-left: ${nomalizes[10]}px;
  flex: 8;
  height: ${nomalizes[40]}px;
  font-size: ${nomalizes[14]}px;
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
}
const TextInput = ({value, setValue, maxLength}: Props) => {
  return (
    <Container>
      <TTextInput
        placeholder="닉네임 입력"
        placeholderTextColor="#646464"
        onChangeText={(text: string) => setValue(text)}
        value={value}
        maxLength={maxLength}
      />
      <LengthContainer>
        <TText>
          {value?.length}/{maxLength}
        </TText>
      </LengthContainer>
    </Container>
  );
};

export default TextInput;
