import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {CategoryProps} from '~/types/Category';

const Container = styled.View`
  min-width: ${nomalizes[85]}px;
`;
const Wrapper = styled.View`
  height: ${nomalizes[35]}px;
  padding-left: ${nomalizes[15]}px;
  padding-right: ${nomalizes[15]}px;
  background-color: #fff;
  border: 1px solid #777;
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
const TText = styled.Text`
  color: #000;
`;
const Options = styled.View`
  width: 100%;
  overflow: hidden;
  border-top-width: 0;
  border-bottom-left-radius: ${nomalizes[5]}px;
  border-bottom-right-radius: ${nomalizes[5]}px;
  margin-top: -${nomalizes[3]}px;
  background-color: #fff;
  border-color: #777777;
`;
const Option = styled.TouchableOpacity`
  width: 100%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${nomalizes[15]}px;
`;
const Mark = styled.View<CategoryProps>`
  width: ${nomalizes[12]}px;
  height: ${nomalizes[12]}px;
  border-radius: ${nomalizes[3]}px;
  margin-right: ${nomalizes[7]}px;
  background-color: ${props => props.color};
`;
const AnimatedOption = Animated.createAnimatedComponent(Options);

interface Props {
  setValue: (value: CategoryProps) => void;
  value: CategoryProps;
}
const SelectInput = ({value, setValue}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedBorder = useRef(new Animated.Value(0)).current;

  const onShow = () => {
    Animated.timing(animatedHeight, {
      toValue: nomalizes[160],
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedBorder, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
    setShow(!show);
  };
  const onHide = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedBorder, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
    setShow(!show);
  };

  const onSelectCategory = (color: string, name: string, no: number) => {
    setValue({color, name, no});
    onHide();
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={show ? onHide : onShow}>
        <Wrapper>
          <FlexEndRow>
            <Mark color={value?.color} />
            <TText>{value?.name}</TText>
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
          borderWidth: animatedBorder,
        }}>
        <ScrollView>
          <Option onPress={() => onSelectCategory('#a14124', '과일', 0)}>
            <Mark color="#a14124" />
            <TText>과일</TText>
          </Option>

          <Option onPress={() => onSelectCategory('#81c98d', '냉동식품', 0)}>
            <Mark color="#81c98d" />
            <TText>냉동식품</TText>
          </Option>

          <Option onPress={() => onSelectCategory('#c981ad', '즉석식품', 0)}>
            <Mark color="#c981ad" />
            <TText>즉석식품</TText>
          </Option>
          <Option onPress={() => onSelectCategory('#b3c981', '생선류', 0)}>
            <Mark color="#b3c981" />
            <TText>생선류</TText>
          </Option>
          <Option onPress={() => onSelectCategory('#5887bd', '인스턴트', 0)}>
            <Mark color="#5887bd" />
            <TText>인스턴트</TText>
          </Option>
        </ScrollView>
      </AnimatedOption>
    </Container>
  );
};

export default SelectInput;
