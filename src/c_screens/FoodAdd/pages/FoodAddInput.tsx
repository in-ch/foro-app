/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Switch} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Header from '@components/Header/Header';
import {RootTabParamList} from '@navigation/RootNavigation';
import {nomalizes} from '@utills/constants';
import TextBox from '@components/TextBox';
import {SizedBox} from '@components/SizedBox';
import SelectInput from '@components/SelectInput';
import DDatePicker from '@components/DatePicker';

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
const Hashtag = styled.View`
  background-color: #f5f5f5;
  width: 100px;
  height: ${nomalizes[25]}px;
  padding: ${nomalizes[5]}px;
  margin-right: ${nomalizes[10]}px;
  margin-bottom: ${nomalizes[10]}px;
  border-radius: ${nomalizes[4]}px;
`;
const HashtagText = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #757575;
`;
export interface FoodSearchResultProps {
  navigation: NavigationProp<RootTabParamList, 'FoodAddInput'>;
  route: RouteProp<RootTabParamList, 'FoodAddInput'>;
}

const FoodAddInput = ({navigation, route}: FoodSearchResultProps) => {
  const [onlyMe, setOnlyMe] = useState(false); // 나만보기
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
          <TextBox text={route?.params?.text} isLeft={true} />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>카테고리 지정</Heading>
          <SelectInput />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>등록일</Heading>
          <DDatePicker />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>소비기한</Heading>
          <DDatePicker />
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>알림 예정일</Heading>
          <Row>
            <DDay>D-2</DDay>
            <DDatePicker />
          </Row>
          <SizedBox.Custom margin={nomalizes[30]} />
          <Heading>유의키워드</Heading>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Hashtag>
              <HashtagText>비조리 섭취 금지</HashtagText>
            </Hashtag>
            <Hashtag>
              <HashtagText>비조리 섭취 금지</HashtagText>
            </Hashtag>
            <Hashtag>
              <HashtagText>비조리 섭취 금지</HashtagText>
            </Hashtag>
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
