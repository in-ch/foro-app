/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {Dimensions, PixelRatio, StyleSheet, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {doIntroSkip} from 'apollo/client';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';

const Container = styled.View<Props>`
  width: ${cWidth};
  height: ${cHeight + nomalizes[50]}px;
  z-index: 9999999999998;
  background-color: white;
  display: ${(props: any) => (props.hide ? 'flex' : 'none')};
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TopContainer = styled.TouchableOpacity`
  width: ${cWidth * 0.9}px;
  height: ${cHeight * 0.1}px;
  position: absolute;
  border-radius: ${nomalizes[15]}px;
  right: ${cWidth * 0.05}px;
  top: ${cHeight * 0.005}px;
  z-index: 999999999999;
  display: flex;
  ${cssUtil.doubleCenter};
`;

const ButtonContainer = styled.TouchableOpacity`
  width: ${cWidth * 0.9}px;
  height: ${cHeight * 0.1}px;
  position: absolute;
  border-radius: ${nomalizes[15]}px;
  right: ${cWidth * 0.05}px;
  top: ${cHeight * 0.7}px;
  z-index: 999999999999;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const SkipContainer = styled.TouchableOpacity`
  width: ${cWidth * 0.9}px;
  height: ${cHeight * 0.5}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${nomalizes[15]}px;
`;
const SkipText = styled.Text`
  color: #000;
`;
const Balls = styled.View`
  width: ${nomalizes[60]}px;
  height: ${nomalizes[40]}px;
  padding-top: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Ball = styled.View<HighlightProps>`
  width: ${nomalizes[6]}px;
  height: ${nomalizes[6]}px;
  border-radius: ${nomalizes[3]}px;
  background-color: ${props => (props.highlight ? '#FF6258' : '#a8a8a8')};
`;
const SkipButtonContainer = styled.View`
  width: 100%;
  height: ${nomalizes[50]}px;
  margin-top: ${nomalizes[100]}px;
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
const ImageView = styled.View`
  width: ${cWidth};
  height: ${nomalizes[370]}px;
  margin-top: ${nomalizes[50]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[16]}px;
  font-weight: bold;
  color: #ff6258;
  margin-top: ${nomalizes[10]}px;
  margin-bottom: ${nomalizes[10]}px;
`;
const SubText = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: #ff6258;
  margin-top: ${nomalizes[5]}px;
  color: #000;
`;
// const LogoutContainer = styled.View`
//   width: ${cWidth}px;
//   height: ${cHeight + nomalizes[50]}px;
//   background-color: rgba(0, 0, 0, 0.3);
//   display: flex;
//   ${cssUtil.doubleCenter};
// `;
// const LogoutWrapper = styled.View`
//   background-color: #fff;
//   width: ${nomalizes[200]}px;
//   height: ${nomalizes[120]}px;
//   border-radius: ${nomalizes[20]}px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: ${nomalizes[10]}px;
//   position: relative;
//   top: -${nomalizes[20]}px;
//   justify-content: space-between;
// `;
// const LogoutText = styled.Text`
//   color: #333333;
//   font-size: ${nomalizes[12]}px;
//   margin-top: ${nomalizes[5]}px;
//   font-weight: bold;
// `;
// const LogoutText2 = styled.Text`
//   color: #333333;
//   font-size: ${nomalizes[10]}px;
//   margin-top: ${nomalizes[5]}px;
// `;
// const SelectButtonWrapper = styled.View`
//   width: 90%;
//   height: ${nomalizes[30]}px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
// const CancelButton = styled.TouchableOpacity`
//   width: 48%;
//   height: ${nomalizes[30]}px;
//   background-color: #dbdbdb;
//   border-radius: ${nomalizes[8]}px;
//   ${cssUtil.doubleCenter};
// `;
// const OkButton = styled.TouchableOpacity`
//   width: 48%;
//   height: ${nomalizes[30]}px;
//   background-color: #ff6258;
//   border-radius: ${nomalizes[8]}px;
//   ${cssUtil.doubleCenter};
// `;
// const ButtonText = styled.Text`
//   color: #fff;
//   font-size: ${nomalizes[11]}px;
// `;
const SStatusBar = styled.StatusBar``;
const IImage = styled.Image``;
const VView = styled.View``;
// const MModal = styled.Modal``;
interface Props {
  hide?: boolean;
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
  const [show, setShow] = useState(false);

  const {width} = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor((x / width) * 1.1);
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

  // const Good = async () => {
  //   sktip();
  //   await doIntroSkip();
  //   // GoToFoodAdd();
  // };

  useEffect(() => {
    onShow();
  }, []);

  return (
    <AnimatedContainer hide={hide} style={{opacity: animatedValue}}>
      <SStatusBar barStyle="dark-content" />
      <TopContainer>
        <Balls>
          <Ball highlight={sliderState.currentPage === 0} />
          <Ball highlight={sliderState.currentPage === 1} />
          <Ball highlight={sliderState.currentPage === 2} />
          <Ball highlight={sliderState.currentPage === 3} />
        </Balls>
      </TopContainer>
      <ScrollView
        style={{flex: 1}}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}>
        <ImageView>
          <IImage
            source={images.intro1}
            style={{
              width: cWidth,
              height: '100%',
            }}
          />
          <Heading>식품 달력</Heading>
          <SubText>달력을 통해 식품 정보를 한눈에 파악할 수 있어요!</SubText>
          <SubText>
            마지막까지 소비할 수 있는 식품 소비 기한이 표시됩니다.
          </SubText>
        </ImageView>
        <ImageView>
          <IImage
            source={images.intro2}
            style={{
              width: cWidth,
              height: '100%',
            }}
          />
          <Heading>이웃을 넘나들며 서로의 식품창고를 구경해 보세요!</Heading>
          <SubText>마음에 드는 먹거리가 보인다면?</SubText>
          <SubText>공유를 부탁해 보세요</SubText>
        </ImageView>
        <ImageView>
          <IImage
            source={images.intro3}
            style={{
              width: cWidth,
              height: '100%',
            }}
          />
          <Heading>소비 기한 알림</Heading>
          <SubText>언제까지 먹을 수 있더라? 잊지 않도록!</SubText>
          <SubText>먹거리를 기록해 볼까요?</SubText>
        </ImageView>
        <ImageView>
          <IImage
            source={images.intro4}
            style={{
              width: cWidth,
              height: '100%',
            }}
          />
          <Heading>식품 등록</Heading>
          <SubText>
            원하는 식품을 검색하면 자동으로 식품 권장 기한이 입력됩니다!
          </SubText>
          <SubText>유의 사항도 같이 확인해 보세요~!</SubText>
        </ImageView>
      </ScrollView>
      <VView style={styles.paginationWrapper}>
        <ButtonContainer>
          <SkipButtonContainer>
            {sliderState.currentPage === 3 ? (
              <SkipButton onPress={sktip}>
                <TText>시작하기</TText>
              </SkipButton>
            ) : (
              <SkipContainer onPress={sktip}>
                <SkipText>Skip</SkipText>
              </SkipContainer>
            )}
          </SkipButtonContainer>
        </ButtonContainer>
      </VView>

      {/* <MModal animationType="fade" visible={show} transparent={true}>
        <LogoutContainer>
          <LogoutWrapper>
            <LogoutText>Fooro에 오신 것을 환영합니다!</LogoutText>
            <LogoutText2>바로 달력에 식품을 추가해 볼까요?</LogoutText2>
            <SelectButtonWrapper>
              <CancelButton onPress={sktip}>
                <ButtonText>건너뛰기</ButtonText>
              </CancelButton>
              <OkButton onPress={Good}>
                <ButtonText>수락하기</ButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </LogoutWrapper>
        </LogoutContainer>
      </MModal> */}
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
