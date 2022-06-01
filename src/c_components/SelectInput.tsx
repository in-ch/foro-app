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
import FFText from './FFText';

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
  data?: any;
}
const SelectInput = ({value, setValue, data}: Props) => {
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
  // const [loadCategory, {data: Category}] = useLazyQuery(LOAD_CATEGORY, {
  //   onCompleted: d => {
  //     console.log(JSON.stringify(d));
  //   },
  //   onError: e => {
  //     console.log(JSON.stringify(e));
  //   },
  //   fetchPolicy: 'network-only',
  // });
  // useEffect(() => {
  //   loadCategory({
  //     variables: {
  //       userNo: 1,
  //     },
  //   });
  // }, [loadCategory]);
  return (
    <Container>
      <TouchableWithoutFeedback onPress={show ? onHide : onShow}>
        <Wrapper>
          <FlexEndRow>
            <Mark color={value?.color} />
            <FFText>{value?.name}</FFText>
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
          <Option onPress={() => onSelectCategory('#FF8616', '과일·견과', 1)}>
            <Mark color="#FF8616" />
            <FFText>과일·견과</FFText>
          </Option>

          <Option onPress={() => onSelectCategory('#019C11', '채소·버섯', 2)}>
            <Mark color="#019C11" />
            <FFText>채소·버섯</FFText>
          </Option>

          <Option onPress={() => onSelectCategory('#5F5BFF', '냉동식품', 3)}>
            <Mark color="#5F5BFF" />
            <FFText>냉동식품</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#FFD056', '유제품', 4)}>
            <Mark color="#FFD056" />
            <FFText>유제품</FFText>
          </Option>
          <Option
            onPress={() => onSelectCategory('#FFA1F6', '가공식품·간식', 5)}>
            <Mark color="#FFA1F6" />
            <FFText>가공식품·간식</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#1ED4FC', '냉장식품', 6)}>
            <Mark color="#1ED4FC" />
            <FFText>냉장식품</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#E33292', '주류', 7)}>
            <Mark color="#E33292" />
            <FFText>주류</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#078E8E', '수산·건어물', 8)}>
            <Mark color="#078E8E" />
            <FFText>수산·건어물</FFText>
          </Option>
          <Option
            onPress={() => onSelectCategory('#8A2C2C', '장·양념·소스', 9)}>
            <Mark color="#8A2C2C" />
            <FFText>장·양념·소스</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#B97E89', '쌀·잡곡', 10)}>
            <Mark color="#B97E89" />
            <FFText>쌀·잡곡</FFText>
          </Option>
          <Option onPress={() => onSelectCategory('#EE1E1E', '정육·난류', 11)}>
            <Mark color="#EE1E1E" />
            <FFText>정육·난류</FFText>
          </Option>
          {data?.map((category: CategoryProps) => {
            return (
              <Option
                onPress={() =>
                  onSelectCategory(
                    String(category.color),
                    String(category.name),
                    Number(category.no),
                  )
                }>
                <Mark color={String(category.color)} />
                <FFText>{String(category.name)}</FFText>
              </Option>
            );
          })}
        </ScrollView>
      </AnimatedOption>
    </Container>
  );
};

export default SelectInput;
