/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import images from '~/assets/images';
import {nomalizes} from '~/utills/constants';
import {cssUtil} from '~/utills/cssUtil';

const Container = styled.View`
  width: 100%;
  min-height: ${nomalizes[100]};
  padding-top: ${nomalizes[20]}px;
`;
const Wrapper = styled.View`
  width: 90%;
  height: ${nomalizes[60]}px;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  margin-bottom: ${nomalizes[10]}px;
`;
const ProfileContainer = styled.View`
  flex: 2;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const Profile = styled.View`
  width: ${nomalizes[45]}px;
  height: ${nomalizes[45]}px;
  border-radius: ${nomalizes[23]}px;
  overflow: hidden;
`;
const TextContainer = styled.View`
  padding-left: ${nomalizes[5]}px;
  padding-top: ${nomalizes[3]}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 8;
`;
const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Bottom = styled.View`
  width: 100%;
  height: ${nomalizes[20]}px;
`;
const FoodText = styled.Text`
  color: #000;
`;
const DDay = styled.Text`
  color: #a4a4a4;
  margin-top: ${nomalizes[4]}px;
`;
const ShareAlarm = () => {
  return (
    <Container>
      <Wrapper>
        <ProfileContainer>
          <Profile>
            <Image
              style={{
                width: nomalizes[45],
                height: nomalizes[45],
              }}
              source={images.user}
            />
          </Profile>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2}>
              이웃 01 님께서 나에게 사과를 공유하셨습니다!
            </FoodText>
          </Header>
          <Bottom>
            <DDay>1시간 전</DDay>
          </Bottom>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <ProfileContainer>
          <Profile>
            <Image
              style={{
                width: nomalizes[45],
                height: nomalizes[45],
              }}
              source={images.user}
            />
          </Profile>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2}>
              이웃 02님께서 나에게 [사과] 나눔을 요청하셨습니다!
            </FoodText>
          </Header>
          <Bottom>
            <DDay>1시간 전</DDay>
          </Bottom>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <ProfileContainer>
          <Profile>
            <Image
              style={{
                width: nomalizes[45],
                height: nomalizes[45],
              }}
              source={images.user}
            />
          </Profile>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2} style={{color: 'red'}}>
              이웃 02님께서 모두에게 [사과] 나눔을 시작합니다. 지금
              요청해보세요!
            </FoodText>
          </Header>
          <Bottom>
            <DDay>1시간 전</DDay>
          </Bottom>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default ShareAlarm;
