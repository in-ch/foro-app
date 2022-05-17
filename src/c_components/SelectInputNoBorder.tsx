import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {Animated} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const Container = styled.View`
  min-width: ${nomalizes[60]}px;
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
const FlexEndRow = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;
const IImage = styled.Image``;
const Options = styled.View`
  width: 100%;
  overflow: hidden;
  margin-top: -${nomalizes[3]}px;
  background-color: #fff;
`;
const Option = styled.TouchableOpacity`
  width: 100%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${nomalizes[15]}px;
`;
const Mark = styled.View<ColorProps>`
  width: ${nomalizes[12]}px;
  height: ${nomalizes[12]}px;
  margin-right: ${nomalizes[7]}px;
  background-color: ${props => props.color};
`;
const AnimatedOption = Animated.createAnimatedComponent(Options);

interface ColorProps {
  color: string;
}
const SelectInputNoBorder = () => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState({
    color: '#ade4fa',
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
    onHide();
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={show ? onHide : onShow}>
        <Wrapper>
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
        </Wrapper>
      </TouchableWithoutFeedback>
      <AnimatedOption
        style={{
          height: animatedHeight,
        }}>
        <ScrollView>
          <Option onPress={() => onSelectCategory('#a14124', '과일')}>
            <Mark color="#a14124" />
          </Option>

          <Option onPress={() => onSelectCategory('#81c98d', '냉동식품')}>
            <Mark color="#81c98d" />
          </Option>

          <Option onPress={() => onSelectCategory('#c981ad', '즉석식품')}>
            <Mark color="#c981ad" />
          </Option>
          <Option onPress={() => onSelectCategory('#b3c981', '생선류')}>
            <Mark color="#b3c981" />
          </Option>
          <Option onPress={() => onSelectCategory('#5887bd', '인스턴트')}>
            <Mark color="#5887bd" />
          </Option>
        </ScrollView>
      </AnimatedOption>
    </Container>
  );
};

export default SelectInputNoBorder;
