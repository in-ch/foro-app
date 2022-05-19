/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import HeaderX from '@components/Header/HeaderX';
import {RootTabParamList} from '@navigation/RootNavigation';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import {Switch, View} from 'react-native';
import {cssUtil} from '~/utills/cssUtil';

export interface FoodAddResultProps {
  navigation: NavigationProp<RootTabParamList, 'FoodDone'>;
  route: RouteProp<RootTabParamList, 'FoodDone'>;
}

const Box = styled.View`
  width: 100%;
  background-color: #fff;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: ${nomalizes[20]}px;
  padding-bottom: ${nomalizes[20]}px;
  margin-bottom: ${nomalizes[20]}px;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-bottom: ${nomalizes[10]}px;
  color: #000;
`;
const Sub = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #000;
`;
const Mark = styled.View<ColorProps>`
  width: ${nomalizes[12]}px;
  height: ${nomalizes[12]}px;
  border-radius: ${nomalizes[3]}px;
  margin-right: ${nomalizes[7]}px;
  background-color: ${props => props.color};
`;
const RowBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${nomalizes[20]}px;
`;
const TText = styled.Text`
  color: #000;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DDay = styled.Text`
  color: #ff6c63;
  font-size: ${nomalizes[14]}px;
  margin-right: ${nomalizes[35]}px;
`;
const HashTag = styled.View`
  height: ${nomalizes[16]}px;
  padding-left: ${nomalizes[5]}px;
  padding-right: ${nomalizes[5]}px;
  background-color: #f5f5f5;
  display: flex;
  margin-right: ${nomalizes[5]}px;
  border-radius: ${nomalizes[4]}px;
  ${cssUtil.doubleCenter};
`;
const HashTagText = styled.Text`
  font-size: ${nomalizes[8]}px;
  color: #757575;
`;
const RowBoxSwitch = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${nomalizes[30]}px;
`;
const RowText = styled.Text`
  font-size: ${nomalizes[14]}px;
  color: #000;
`;

interface ColorProps {
  color: string;
}

const FoodDone = ({navigation, route}: FoodAddResultProps) => {
  const {category, dday, keyword, name, onlyMe} = route.params.foodAddParams;

  return (
    <>
      <HeaderX
        text="식품 상세"
        button={() => navigation.reset({routes: [{name: 'Home'}]})}
      />
      <Box>
        <Heading>{category.name}</Heading>
        <RowBox>
          <Mark color={String(category.color)} />
          <TText>{name}</TText>
        </RowBox>
      </Box>
      <Box>
        <Heading>식품등록일</Heading>
        <Sub>{moment(new Date()).format('YYYY.MM.DD')}</Sub>
        <SizedBox.Custom margin={nomalizes[30]} />
        <Heading>소비기한</Heading>
        <Sub>{moment(dday).format('YYYY.MM.DD')}</Sub>
        <SizedBox.Custom margin={nomalizes[30]} />
        <Heading>알림 예정일</Heading>
        <Row>
          <DDay>D-2</DDay>
          <Sub>{moment(dday).add(Number(-2), 'day').format('YYYY.MM.DD')}</Sub>
        </Row>
      </Box>
      <Box>
        <Heading>유의 키워드</Heading>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {keyword.map(keywor => {
            return (
              <HashTag>
                <HashTagText>{keywor}</HashTagText>
              </HashTag>
            );
          })}
        </View>
        <SizedBox.Custom margin={nomalizes[20]} />
        <RowBoxSwitch>
          <RowText>나만 보기</RowText>
          <Switch
            trackColor={{false: '#767577', true: '#FF6C63'}}
            thumbColor={onlyMe ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={onlyMe}
            style={{marginLeft: 10}}
          />
        </RowBoxSwitch>
      </Box>
    </>
  );
};

export default FoodDone;
