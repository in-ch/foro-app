/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {View, Switch} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

import Header from '@components/Header/Header';
import {RootTabParamList} from '@navigation/RootNavigation';
import {nomalizes} from '@utills/constants';
import TextBox from '@components/TextBox';
import {SizedBox} from '@components/SizedBox';
import SelectInput from '@components/SelectInput';
import DDatePicker from '@components/DatePicker';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  flex: 1;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: ${nomalizes[20]}px;
  background-color: #fff;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-bottom: ${nomalizes[10]}px;
  color: #000;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RowBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${nomalizes[30]}px;
`;
const RowText = styled.Text`
  font-size: ${nomalizes[14]}px;
  color: #000;
`;
const DDay = styled.Text`
  color: #ff6c63;
  font-size: ${nomalizes[14]}px;
  margin-right: ${nomalizes[10]}px;
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
export interface FoodSearchResultProps {
  navigation: NavigationProp<RootTabParamList, 'FoodAddInput'>;
  route: RouteProp<RootTabParamList, 'FoodAddInput'>;
}

const FoodAddInput = ({navigation, route}: FoodSearchResultProps) => {
  const [onlyMe, setOnlyMe] = useState(false); // 나만보기
  const {name, date, keyword} = route.params.food;
  const [dday, setDDay] = useState(moment(new Date()).add(date, 'days'));
  const [alarmDay, setAlarmDay] = useState(
    moment(new Date()).add(Number(date) - Number(2), 'days'),
  );

  useEffect(() => {
    setAlarmDay(moment(dday).add(-Number(2), 'days'));
  }, [dday]);
  return (
    <>
      <Header
        text="식품 추가하기"
        back={() => navigation.goBack()}
        button={() => navigation.reset({routes: [{name: 'FoodDone'}]})}
      />
      <Container>
        <ScrollView>
          <Heading>식품명</Heading>
          <TextBox text={name} isLeft={true} />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>카테고리 지정</Heading>
          <SelectInput />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>등록일</Heading>
          <DDatePicker
            day={moment(new Date())}
            setDay={() => console.log('asd')}
            disable={true}
          />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>소비기한</Heading>
          <DDatePicker day={dday} setDay={setDDay} />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>알림 예정일</Heading>
          <Row>
            <DDay>D-2</DDay>
            <DDatePicker day={alarmDay} disable={true} setDay={setAlarmDay} />
          </Row>
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>유의키워드</Heading>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {keyword.map(keywor => {
              return (
                <HashTag>
                  <HashTagText>{keywor}</HashTagText>
                </HashTag>
              );
            })}
          </View>
          <SizedBox.Custom margin={nomalizes[15]} />
          <RowBox>
            <RowText>나만 보기</RowText>
            <Switch
              trackColor={{false: '#767577', true: '#FF6C63'}}
              thumbColor={onlyMe ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setOnlyMe(!onlyMe)}
              value={onlyMe}
              style={{marginLeft: 10}}
            />
          </RowBox>
          <SizedBox.Custom margin={nomalizes[50]} />
        </ScrollView>
      </Container>
    </>
  );
};

export default FoodAddInput;
