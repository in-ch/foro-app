import React, {memo} from 'react';
import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';

import {isAndroid} from '@utills/constants';

const StyledTouchable = styled.TouchableOpacity`
  width: 100%;
  height: ${({height}: ViewStyle) => height}px;
`;

interface TouchableProps {
  height?: number;
  touchable?: boolean;
  onPress?: () => void;
  color?: string;
  style?: ViewStyle;
}
interface CustomProps extends TouchableProps {
  margin?: number;
  getStatusBarHeight?: number;
}

const MarginCustom = (props: CustomProps) => (
  <Touchable {...props} height={props.margin} />
);

const StatusBar = (props: CustomProps) => (
  <Touchable {...props} height={isAndroid ? 0 : props.getStatusBarHeight} />
);

const Touchable = memo(
  ({
    height,
    touchable = false,
    onPress = () => null,
    style = {},
  }: TouchableProps) => (
    <StyledTouchable
      height={height}
      disabled={!touchable}
      onPress={onPress}
      style={style}
    />
  ),
);

export const SizedBox = {
  Custom: MarginCustom,
  status: StatusBar,
};
