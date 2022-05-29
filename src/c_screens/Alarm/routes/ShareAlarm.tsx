import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import images from '@assets/images';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  width: 100%;
  min-height: ${nomalizes[100]};
  padding-top: ${nomalizes[20]}px;
`;
const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  margin-bottom: ${nomalizes[20]}px;
`;
const ProfileContainer = styled.View`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Profile = styled.View`
  width: ${nomalizes[35]}px;
  height: ${nomalizes[35]}px;
  border-radius: ${nomalizes[20]}px;
  overflow: hidden;
`;
const Button = styled.View`
  width: ${nomalizes[55]}px;
  height: ${nomalizes[22]}px;
  border: 1px solid #ff6258;
  margin-top: ${nomalizes[5]}px;
  border-radius: ${nomalizes[11]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  font-size: ${nomalizes[8]}px;
  color: #ff6258;
`;
const TextContainer = styled.View`
  padding-left: ${nomalizes[10]}px;
  padding-top: ${nomalizes[3]}px;
  display: flex;
  flex-direction: column;
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
  font-size: ${nomalizes[10]}px;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: ${nomalizes[2]};
  line-height: ${nomalizes[15]}px;
`;
const DDay = styled.Text`
  color: #a4a4a4;
  font-size: ${nomalizes[10]}px;
  margin-top: ${nomalizes[5]};
`;
const ShareAlarm = () => {
  return (
    <Container>
      <Wrapper>
        <ProfileContainer>
          <Profile>
            <Image
              style={{
                width: nomalizes[35],
                height: nomalizes[35],
              }}
              source={images.user}
            />
          </Profile>
          <Button>
            <ButtonText>이웃나눔</ButtonText>
          </Button>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2}>
              '이웃 02'님께서 '내 닉네임'에게 [사과] 나눔을 요청하셨습니다!
            </FoodText>
          </Header>
          <Bottom>
            <DDay>1시간 전</DDay>
          </Bottom>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <ProfileContainer>
          <Button>
            <ButtonText>나눠주세요</ButtonText>
          </Button>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2}>
              '이웃 02'님께서 내게 [사과] 나눔을 요청하셨습니다!
            </FoodText>
          </Header>
          <Bottom>
            <DDay>1시간 전</DDay>
          </Bottom>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <ProfileContainer>
          <Button>
            <ButtonText>전체나눔</ButtonText>
          </Button>
        </ProfileContainer>
        <TextContainer>
          <Header>
            <FoodText numberOfLines={2}>
              '이웃 닉네임'께서 모두에게 [사과] 나눔을 시작했습니다. 지금 바로
              요청해보세요.
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
