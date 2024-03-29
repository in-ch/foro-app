/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useQuery, useReactiveVar} from '@apollo/client';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets';

import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {tokenUserNo} from 'apollo/client';
import {LOAD_USER} from '@services/queries/user';
import {LOAD_ALARM_NOT} from '@services/queries/alarm';
import Bell from './Bell';
import Search from './Search';

const Container = styled.View`
  width: 100%;
  height: ${nomalizes[35]}px;
  padding-top: ${nomalizes[10]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #f4f4f4; */
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
  position: relative;
  top: -${nomalizes[5]}px;
`;
const Img = styled.Image`
  width: ${nomalizes[17]}px;
  height: ${nomalizes[15]}px;
`;
const Highlist = styled.View<HighlistProps>`
  width: ${nomalizes[4]}px;
  height: ${nomalizes[4]}px;
  border-radius: ${nomalizes[2]}px;
  margin-left: ${nomalizes[12]}px;
  margin-bottom: ${nomalizes[2]}px;
  background-color: #ff6258;
  opacity: ${props => (props.highlite ? 1 : 0)};
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
  height: ${nomalizes[18]}px;
  text-overflow: ellipsis;
`;
const ProfileNickname = styled.Text`
  margin-left: ${nomalizes[15]}px;
  font-size: ${nomalizes[12]}px;
  font-weight: bold;
  color: rgb(50, 50, 50);
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
`;
const IImage = styled.Image`
  width: ${nomalizes[50]};
  height: ${nomalizes[50]};
`;
const LogoutContainer = styled.View`
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[40]}px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  ${cssUtil.doubleCenter};
`;
const LogoutWrapper = styled.View`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[90]}px;
  border-radius: ${nomalizes[20]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${nomalizes[10]}px;
  position: relative;
  top: -${nomalizes[20]}px;
  justify-content: space-between;
`;
const LogoutText = styled.Text`
  color: #333333;
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[5]}px;
`;
const SelectButtonWrapper = styled.View`
  width: 90%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CancelButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #dbdbdb;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const OkButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #ff6258;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;
const MModal = styled.Modal``;
const AnimatedContainer = Animated.createAnimatedComponent(SidebarContainer);

interface Props {
  GoToAlarm: () => void;
  GoToSearch: () => void;
  GoToCategory: () => void;
  GoToNeighbor: () => void;
  GoToSetting: () => void;
  GoToProfile: () => void;
  Logout: () => void;
}
interface ContainerProps {
  show: boolean;
}
interface HighlistProps {
  highlite: boolean;
}

const MenuBar = ({
  GoToAlarm,
  GoToSearch,
  GoToCategory,
  GoToNeighbor,
  GoToSetting,
  GoToProfile,
  Logout,
}: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const asdf = () => {
    GoToAlarm();
    setHightLite(false);
  };
  const [hightLite, setHightLite] = useState(true);
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
  const clickModal = () => {
    setShow(!show);
  };
  const logout = () => {
    Logout();
  };
  const userNo = useReactiveVar(tokenUserNo);
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
    fetchPolicy: 'cache-and-network',
  });
  const {data: myAlarm} = useQuery(LOAD_ALARM_NOT, {
    variables: {
      userNo,
    },
    onCompleted: d => {
      console.log(d);
    },
    fetchPolicy: 'network-only',
  });

  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Container>
        <HambergerContainer onPress={onShow}>
          <Img source={Images.hamber} />
        </HambergerContainer>
        <Img
          style={{width: 45, height: 12, marginBottom: 3}}
          source={Images.textLogo}
        />

        <SearchAlarmContainer>
          <TouchableWithoutFeedback onPress={asdf}>
            <Highlist
              highlite={
                myAlarm?.loadAlarmNotRead?.length > 0 && hightLite
                  ? true
                  : false
              }
            />
            <Bell />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={GoToSearch}>
            <Highlist highlite={false} />
            <Search />
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
                  <IImage source={{uri: data?.loadUser?.profile}} />
                </Profile>
                <ProfileNicknameContainer onPress={GoToProfile}>
                  <ProfileNickname numberOfLines={1}>
                    {data?.loadUser?.nickname}
                  </ProfileNickname>
                </ProfileNicknameContainer>
                <Icon name="keyboard-arrow-right" size={20} color="#3a3a3a" />
              </ProfileContainer>
              <CategoryContainer
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                }}>
                <TextContainer onPress={GoToNeighbor}>
                  <TText style={{fontSize: nomalizes[14]}}>이웃 관리</TText>
                  <Icon name="keyboard-arrow-right" size={20} color="#3a3a3a" />
                </TextContainer>
                <TextContainer onPress={GoToCategory}>
                  <TText style={{fontSize: nomalizes[14]}}>카테고리 관리</TText>
                  <Icon name="keyboard-arrow-right" size={20} color="#3a3a3a" />
                </TextContainer>
              </CategoryContainer>
              <SettingContainer>
                <TextContainer onPress={GoToSetting}>
                  <TText style={{fontSize: nomalizes[14]}}>설정</TText>
                </TextContainer>
                <TextContainer onPress={clickModal}>
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

      <MModal animationType="fade" visible={show} transparent={true}>
        <LogoutContainer>
          <LogoutWrapper>
            <LogoutText>정말 로그아웃하시나요?</LogoutText>
            <SelectButtonWrapper>
              <CancelButton onPress={clickModal}>
                <ButtonText>취소</ButtonText>
              </CancelButton>
              <OkButton onPress={logout}>
                <ButtonText>확인</ButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </LogoutWrapper>
        </LogoutContainer>
      </MModal>
    </>
  );
};

export default MenuBar;
