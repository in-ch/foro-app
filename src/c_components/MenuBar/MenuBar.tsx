/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Animated, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import Images from 'assets';

const Container = styled.View`
  width: 100%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
`;
const HambergerContainer = styled.TouchableOpacity`
  width: ${nomalizes[70]}px;
  height: ${nomalizes[30]}px;
  padding-left: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const SearchAlarmContainer = styled.View`
  width: ${nomalizes[70]}px;
  height: ${nomalizes[30]}px;
  padding-right: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const LogoText = styled.Text`
  font-size: ${nomalizes[14]}px;
  font-weight: bold;
`;
const Img = styled.Image`
  width: ${nomalizes[17]}px;
  height: ${nomalizes[15]}px;
`;

const SidebarContainer = styled.View<ContainerProps>`
  display: flex;
  height: ${cHeight + nomalizes[50]}px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  overflow: hidden;
`;
const Wrapper = styled.View`
  width: 100%;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  flex-direction: row;
`;
const Main = styled.View`
  width: ${cWidth * 0.7};
  height: ${cHeight + nomalizes[50]}px;
  background-color: white;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const Extra = styled.View`
  width: ${cWidth * 0.3};
  height: ${cHeight + nomalizes[50]}px;
`;
const ContentWrapper = styled.View`
  width: 80%;
  height: ${cHeight}px;
`;
const ProfileContainer = styled.View`
  width: 100%;
  height: ${nomalizes[130]}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;
const Profile = styled.View`
  width: ${nomalizes[50]}px;
  height: ${nomalizes[50]}px;
  border-radius: ${nomalizes[25]}px;
  background-color: #ececec;
  display: flex;
  ${cssUtil.doubleCenter};
  overflow: hidden;
`;
const ProfileNicknameContainer = styled.TouchableOpacity`
  max-width: 60%;
  height: ${nomalizes[15]}px;
  text-overflow: ellipsis;
`;
const ProfileNickname = styled.Text`
  margin-left: ${nomalizes[15]}px;
  font-size: ${nomalizes[14]}px;
  font-weight: bold;
  color: rgb(50, 50, 50);
`;
const CategoryContainer = styled.View`
  width: 100%;
  height: ${nomalizes[130]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const TextContainer = styled.TouchableOpacity`
  width: 95%;
  margin-left: 2.5%;
  height: ${nomalizes[18]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${nomalizes[10]}px;
  margin-bottom: ${nomalizes[10]}px;
`;
const SettingContainer = styled.View`
  width: 100%;
  height: ${nomalizes[110]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const TText = styled.Text`
  color: rgb(50, 50, 50);
`;

const AnimatedContainer = Animated.createAnimatedComponent(SidebarContainer);

interface Props {
  GoToAlarm: () => void;
  GoToSearch: () => void;
  GoToCategory: () => void;
  GoToNeighbor: () => void;
  GoToSetting: () => void;
  GoToProfile: () => void;
}
interface ContainerProps {
  show: boolean;
}

const MenuBar = ({
  GoToAlarm,
  GoToSearch,
  GoToCategory,
  GoToNeighbor,
  GoToSetting,
  GoToProfile,
}: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const onShow = () => {
    Animated.timing(animatedValue, {
      toValue: cWidth,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const onHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Container>
        <HambergerContainer onPress={onShow}>
          <Img source={Images.hamber} />
        </HambergerContainer>
        <LogoText>Fooro</LogoText>
        <SearchAlarmContainer>
          <TouchableWithoutFeedback onPress={GoToAlarm}>
            <Img
              style={{
                marginRight: nomalizes[5],
              }}
              source={Images.alarm}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={GoToSearch}>
            <Img source={Images.search} />
          </TouchableWithoutFeedback>
        </SearchAlarmContainer>
      </Container>
      <AnimatedContainer style={{width: animatedValue}}>
        <Wrapper>
          <Main>
            <ContentWrapper>
              <ProfileContainer
                style={{borderBottomColor: '#000', borderBottomWidth: 1}}>
                <Profile>
                  <Image
                    style={{
                      width: nomalizes[50],
                      height: nomalizes[50],
                    }}
                    source={Images.user}
                  />
                </Profile>
                <ProfileNicknameContainer onPress={GoToProfile}>
                  <ProfileNickname numberOfLines={1}>닉네임</ProfileNickname>
                </ProfileNicknameContainer>
                <Image
                  style={{
                    width: nomalizes[6],
                    height: nomalizes[6],
                    marginLeft: nomalizes[4],
                  }}
                  source={Images.arrowLeft}
                />
              </ProfileContainer>
              <CategoryContainer
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                }}>
                <TextContainer onPress={GoToNeighbor}>
                  <TText style={{fontSize: nomalizes[14]}}>이웃 관리</TText>
                  <Image
                    style={{
                      width: nomalizes[6],
                      height: nomalizes[6],
                      marginLeft: nomalizes[4],
                    }}
                    source={Images.arrowLeft}
                  />
                </TextContainer>
                <TextContainer onPress={GoToCategory}>
                  <TText style={{fontSize: nomalizes[14]}}>카테고리 관리</TText>
                  <Image
                    style={{
                      width: nomalizes[6],
                      height: nomalizes[6],
                      marginLeft: nomalizes[4],
                    }}
                    source={Images.arrowLeft}
                  />
                </TextContainer>
              </CategoryContainer>
              <SettingContainer>
                <TextContainer onPress={GoToSetting}>
                  <TText style={{fontSize: nomalizes[14]}}>설정</TText>
                </TextContainer>
                <TextContainer>
                  <TText style={{fontSize: nomalizes[14]}}>로그아웃</TText>
                </TextContainer>
              </SettingContainer>
            </ContentWrapper>
          </Main>
          <TouchableWithoutFeedback onPress={onHide}>
            <Extra />
          </TouchableWithoutFeedback>
        </Wrapper>
      </AnimatedContainer>
    </>
  );
};

export default MenuBar;
