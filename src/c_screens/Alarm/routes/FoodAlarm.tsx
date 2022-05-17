import React from 'react';
import styled from 'styled-components/native';
import {nomalizes} from '~/utills/constants';

const Container = styled.View`
  width: 100%;
  min-height: ${nomalizes[100]};
  padding-top: ${nomalizes[20]}px;
`;
const TextContainer = styled.View`
  width: 90%;
  height: ${nomalizes[40]}px;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${nomalizes[10]}px;
`;
const Header = styled.View`
  width: 100%;
  height: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
`;
const Bottom = styled.View`
  width: 100%;
  height: ${nomalizes[20]}px;
`;
const FoodName = styled.Text`
  color: #000;
`;
const FoodText = styled.Text`
  margin-left: ${nomalizes[5]}px;
  color: #000;
`;
const DDay = styled.Text`
  color: #a4a4a4;
`;
const FoodAlarm = () => {
  return (
    <Container>
      <TextContainer>
        <Header>
          <FoodName>[햇반]</FoodName>
          <FoodText>소비 기한이 앞으로 2일 남았어요!</FoodText>
        </Header>
        <Bottom>
          <DDay>방금 전</DDay>
        </Bottom>
      </TextContainer>
      <TextContainer>
        <Header>
          <FoodName>[사과]</FoodName>
          <FoodText>소비 기한이 앞으로 5일 남았어요!</FoodText>
        </Header>
        <Bottom>
          <DDay>1시간 전</DDay>
        </Bottom>
      </TextContainer>
      <TextContainer>
        <Header>
          <FoodName>[오렌지]</FoodName>
          <FoodText>소비 기한이 앞으로 9일 남았어요!</FoodText>
        </Header>
        <Bottom>
          <DDay>하루 전</DDay>
        </Bottom>
      </TextContainer>
    </Container>
  );
};

export default FoodAlarm;
