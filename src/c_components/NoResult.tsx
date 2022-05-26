import React from 'react';
import styled from 'styled-components/native';
import {cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[250]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  color: #5e5e5e;
  font-size: ${nomalizes[12]}px;
`;

interface Props {
  text: string;
}
const NoResult = ({text}: Props) => {
  return (
    <Container>
      <TText>{text}</TText>
    </Container>
  );
};

export default NoResult;
