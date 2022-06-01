import React from 'react';
import styled from 'styled-components/native';

import {nomalizes} from '@utills/constants';

const TText = styled.Text<TextProps>`
  font-size: ${props => (props.fontSize ? props.fontSize : nomalizes[12])}px;
  color: ${props => (props.color ? props.color : '#222222')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
  font-family: 'Pretendard';
`;
interface Props {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
interface TextProps {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

const FFText = (props: Props) => {
  const {color, fontSize, fontWeight, children} = props;

  return (
    <TText color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </TText>
  );
};

export default FFText;
