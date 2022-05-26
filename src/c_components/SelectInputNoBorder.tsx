import {Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {cWidth, nomalizes} from '@utills/constants';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  width: ${cWidth}px;
`;
const Wrapper = styled.View`
  height: ${nomalizes[35]}px;
  padding-left: ${nomalizes[15]}px;
  padding-right: ${nomalizes[15]}px;
  background-color: #fff;
  border-radius: ${nomalizes[5]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Row = styled.View`
  width: ${nomalizes[30]}px;
  height: ${nomalizes[35]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FlexEndRow = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const IImage = styled.Image``;
const Options = styled.View`
  margin-top: -${nomalizes[3]}px;
  background-color: #fff;
  overflow: hidden;
`;
const RowColor = styled.View`
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
  flex-wrap: nowrap;
`;
const Option = styled.TouchableOpacity<Selected>`
  width: ${nomalizes[22]}px;
  height: ${nomalizes[22]}px;
  border-radius: ${nomalizes[5]}px;
  display: flex;
  flex-direction: row;
  margin: ${nomalizes[15]}px;
  border: ${props => (props.isSelected ? 1 : 0)}px solid #b1b1b1;
  ${cssUtil.doubleCenter};
`;
const Mark = styled.View<ColorProps>`
  width: ${nomalizes[15]}px;
  height: ${nomalizes[15]}px;
  background-color: ${props => props.color};
`;
const TText = styled.Text`
  color: #000;
  font-size: ${nomalizes[12]}px;
`;
const AnimatedOption = Animated.createAnimatedComponent(Options);

interface ColorProps {
  color: string;
}
interface Selected {
  isSelected: boolean;
}
interface Props {
  setColor: (value: string) => void;
}
const SelectInputNoBorder = ({setColor}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState({
    color: '#43419A',
    name: '과일',
  });
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const onShow = () => {
    Animated.timing(animatedHeight, {
      toValue: nomalizes[160],
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const onHide = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
    setShow(!show);
  };

  const onSelectCategory = (color: string, name: string) => {
    setValue({color, name});
    setColor(color);
    onHide();
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={show ? onHide : onShow}>
        <Wrapper>
          <Row>
            <TText>색상</TText>
          </Row>
          <Row>
            <FlexEndRow>
              <Mark color={value?.color} />
            </FlexEndRow>
            <IImage
              style={{
                width: nomalizes[5],
                height: nomalizes[5],
              }}
              source={images.arrowDown}
            />
          </Row>
        </Wrapper>
      </TouchableWithoutFeedback>
      <AnimatedOption
        style={{
          height: animatedHeight,
        }}>
        <RowColor>
          <Option
            isSelected={value.color === '#43419A'}
            onPress={() => onSelectCategory('#43419A', '과일')}>
            <Mark color="#43419A" />
          </Option>
          <Option
            isSelected={value.color === '#02DA8C'}
            onPress={() => onSelectCategory('#02DA8C', '냉동식품')}>
            <Mark color="#02DA8C" />
          </Option>
          <Option
            isSelected={value.color === '#9DB694'}
            onPress={() => onSelectCategory('#9DB694', '즉석식품')}>
            <Mark color="#9DB694" />
          </Option>
          <Option
            isSelected={value.color === '#A389C5'}
            onPress={() => onSelectCategory('#A389C5', '생선류')}>
            <Mark color="#A389C5" />
          </Option>
          <Option
            isSelected={value.color === '#787766'}
            onPress={() => onSelectCategory('#787766', '인스턴트')}>
            <Mark color="#787766" />
          </Option>
        </RowColor>
        <RowColor>
          <Option
            isSelected={value.color === '#BDEC00'}
            onPress={() => onSelectCategory('#BDEC00', '과일')}>
            <Mark color="#BDEC00" />
          </Option>
          <Option
            isSelected={value.color === '#FF7676'}
            onPress={() => onSelectCategory('#FF7676', '냉동식품')}>
            <Mark color="#FF7676" />
          </Option>
          <Option
            isSelected={value.color === '#39A5BC'}
            onPress={() => onSelectCategory('#39A5BC', '즉석식품')}>
            <Mark color="#39A5BC" />
          </Option>
          <Option
            isSelected={value.color === '#DAAE15'}
            onPress={() => onSelectCategory('#DAAE15', '생선류')}>
            <Mark color="#DAAE15" />
          </Option>
          <Option
            isSelected={value.color === '#AD00FF'}
            onPress={() => onSelectCategory('#AD00FF', '인스턴트')}>
            <Mark color="#AD00FF" />
          </Option>
        </RowColor>
      </AnimatedOption>
    </Container>
  );
};

export default SelectInputNoBorder;
