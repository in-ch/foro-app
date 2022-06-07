/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import FFText from './FFText';

const Container = styled.View<ContainerProps>`
  height: ${nomalizes[35]}px;
  background-color: #fff;
  border: ${props => (props.onlyBottom ? 0 : 1)}px solid #777777;
  border-radius: ${nomalizes[5]}px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const TTextInput = styled.TextInput`
  padding-left: ${nomalizes[10]}px;
  flex: 8.5;
  height: ${nomalizes[40]}px;
  font-size: ${nomalizes[12]}px;
  color: rgb(50, 50, 50);
`;
const LengthContainer = styled.View`
  flex: 1.5;
  height: ${nomalizes[40]}px;
  padding-right: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  onlyBottom?: boolean;
}
interface ContainerProps {
  onlyBottom?: boolean;
}
const TextInput = ({
  value,
  setValue,
  maxLength,
  placeholder,
  onlyBottom,
}: Props) => {
  return (
    <Container
      onlyBottom={onlyBottom}
      style={{
        borderBottomColor: onlyBottom ? '#DBDBDB' : '',
        borderBottomWidth: onlyBottom ? 1 : 0,
      }}>
      <TTextInput
        placeholder={placeholder ? placeholder : '닉네임 입력'}
        placeholderTextColor="#646464"
        onChangeText={(text: string) => setValue(text)}
        value={value}
        maxLength={maxLength}
      />
      <LengthContainer>
        <FFText>
          {value?.length ? value?.length : 0}/{maxLength}
        </FFText>
      </LengthContainer>
    </Container>
  );
};

export default TextInput;
