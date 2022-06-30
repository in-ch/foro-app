/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {doIntroSkip} from '~/apollo/apollo';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';

const Container = styled.View<Props>`
  width: 100%;
  height: ${cHeight + nomalizes[50]}px;
  z-index: 999999999998;
  display: ${(props: any) => (props.hide ? 'flex' : 'none')};
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ButtonContainer = styled.TouchableOpacity`
  width: ${cWidth * 0.9}px;
  height: ${cHeight * 0.3}px;
  position: absolute;
  border-radius: ${nomalizes[15]}px;
  right: ${cWidth * 0.05}px;
  top: ${cHeight * 0.7}px;
  z-index: 999999999999;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const Balls = styled.View`
  width: ${nomalizes[120]}px;
  height: ${nomalizes[40]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Ball = styled.View<HighlightProps>`
  width: ${nomalizes[8]}px;
  height: ${nomalizes[8]}px;
  border-radius: ${nomalizes[4]}px;
  background-color: ${props => (props.highlight ? '#FF6258' : '#fff')};
`;
const SkipButtonContainer = styled.View`
  width: 100%;
  height: ${nomalizes[50]}px;
  margin-top: ${nomalizes[10]}px;
`;
const SkipButton = styled.TouchableOpacity`
  width: 100%;
  height: ${nomalizes[40]}px;
  background-color: #ff6258;
  display: flex;
  border-radius: ${nomalizes[10]}px;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  color: white;
  font-size: ${nomalizes[14]}px;
`;

interface Props {
  hide: boolean;
}
interface HighlightProps {
  highlight: boolean;
}

const IntroApp = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const onShow = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const onHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const [sliderState, setSliderState] = useState({currentPage: 0});
  const [hide, setHide] = useState(true);

  const {width, height} = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor((x / width) * 1);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const sktip = async () => {
    await doIntroSkip();
    onHide();
    setTimeout(() => {
      setHide(false);
    }, 501);
  };

  useEffect(() => {
    onShow();
  }, []);

  const {currentPage: pageIndex} = sliderState;

  return (
    <AnimatedContainer hide={hide} style={{opacity: animatedValue}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{flex: 1}}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}>
        <View style={{width, height}}>
          <Image
            source={images.intro1}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{width, height}}>
          <Image
            source={images.intro1}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{width, height}}>
          <Image
            source={images.intro1}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={{width, height}}>
          <Image
            source={images.intro1}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(3).keys()).map((key, index) => (
          <View
            style={[
              styles.paginationDots,
              {opacity: pageIndex === index ? 1 : 0.2},
            ]}
            key={index}
          />
        ))}
        <ButtonContainer>
          <Balls>
            <Ball highlight={sliderState.currentPage === 0} />
            <Ball highlight={sliderState.currentPage === 1} />
            <Ball highlight={sliderState.currentPage === 2} />
            <Ball highlight={sliderState.currentPage === 3} />
          </Balls>
          <SkipButtonContainer>
            {sliderState.currentPage === 3 && (
              <SkipButton onPress={sktip}>
                <TText>시작하기</TText>
              </SkipButton>
            )}
          </SkipButtonContainer>
        </ButtonContainer>
      </View>
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    top: nomalizes[20],
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#EA7B67',
    marginLeft: 10,
  },
});

export default IntroApp;
