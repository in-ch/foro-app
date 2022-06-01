import React from 'react';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';
import FFText from './FFText';

const Container = styled.View<ContainerProps>`
  height: ${nomalizes[35]}px;
  padding-left: ${nomalizes[15]}px;
  padding-right: ${nomalizes[15]}px;
  background-color: #fff;
  border: 1px solid #777777;
  border-radius: ${nomalizes[5]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.isLeft ? 'flex-start' : 'center')};
`;

interface Props {
  text: string;
  isLeft?: boolean;
}
interface ContainerProps {
  isLeft?: boolean;
}

const TextBox = ({text, isLeft}: Props) => {
  return (
    <Container isLeft={isLeft}>
      <FFText>{text}</FFText>
    </Container>
  );
};

export default TextBox;
