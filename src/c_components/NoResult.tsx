import React from 'react';
import styled from 'styled-components/native';
import {cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import FFText from './FFText';

const Container = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[250]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;

interface Props {
  text: string;
}
const NoResult = ({text}: Props) => {
  return (
    <Container>
      <FFText color="#000">{text}</FFText>
    </Container>
  );
};

export default NoResult;
