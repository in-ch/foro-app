/* eslint-disable react-native/no-inline-styles */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {View, Switch, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

import Header from '@components/Header/Header';
import {RootTabParamList} from '@navigation/RootNavigation';
import {nomalizes, statusBarHeight} from '@utills/constants';
import TextBox from '@components/TextBox';
import {SizedBox} from '@components/SizedBox';
import SelectInput from '@components/SelectInput';
import DDatePicker from '@components/DatePicker';
import TextInput from '@components/TextInput';
import {cssUtil} from '@utills/cssUtil';
import {CategoryProps} from '~/types/Category';
import {useQuery} from '@apollo/client';
import {LOAD_CATEGORY} from '~/c_services/queries/category';

const Container = styled.KeyboardAvoidingView`
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
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
`;
const DDay = styled.Text`
  color: #ff6c63;
  font-size: ${nomalizes[14]}px;
  margin-right: ${nomalizes[10]}px;
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
`;
export interface FoodSearchResultProps {
  navigation: NavigationProp<RootTabParamList, 'FoodAddInput'>;
  route: RouteProp<RootTabParamList, 'FoodAddInput'>;
}

const FoodAddInput = ({navigation, route}: FoodSearchResultProps) => {
  const [onlyMe, setOnlyMe] = useState(false); // 나만보기
  const [memo, setMemo] = useState<string>(''); // 메모
  const {name, date, keyword, category} = route.params.food;
  const [categoryValue, setCategoryValue] = useState<CategoryProps>(category); // 카테고리
  const [dday, setDDay] = useState(moment(new Date()).add(date, 'days'));
  const [alarmDay, setAlarmDay] = useState(
    moment(new Date()).add(Number(date) - Number(2), 'days'),
  );

  useEffect(() => {
    setAlarmDay(moment(dday).add(-Number(2), 'days'));
  }, [dday]);

  const {data: Category} = useQuery(LOAD_CATEGORY, {
    variables: {
      userNo: 1,
    },
    onCompleted: d => {
      console.log(JSON.stringify(d));
    },
    onError: e => {
      console.log(JSON.stringify(e));
    },
    fetchPolicy: 'network-only',
  });
  return (
    <>
      <Header
        text="식품 추가하기"
        back={() => navigation.goBack()}
        button={() =>
          navigation.navigate('FoodDone', {
            foodAddParams: {
              name,
              keyword,
              category: categoryValue,
              dday: String(dday),
              onlyMe,
              memo,
            },
          })
        }
      />
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={statusBarHeight}>
        <ScrollView>
          <Heading>식품명</Heading>
          <TextBox text={name} isLeft={true} />
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>카테고리 지정</Heading>
          <SelectInput
            setValue={(value: CategoryProps) => setCategoryValue(value)}
            value={categoryValue}
            data={Category?.loadCategory}
          />
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>등록일</Heading>
          <DDatePicker
            day={moment(new Date())}
            setDay={() => console.log('asd')}
            disable={true}
          />
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>기타 메모</Heading>
          <TextInput
            value={memo}
            setValue={setMemo}
            maxLength={15}
            placeholder="기타 메모"
          />
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>소비기한</Heading>
          <DDatePicker day={dday} setDay={setDDay} />
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>알림 예정일</Heading>
          <Row>
            <DDay>D-2</DDay>
            <DDatePicker day={alarmDay} disable={true} setDay={setAlarmDay} />
          </Row>
          <SizedBox.Custom margin={nomalizes[20]} />
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
            <RowText>공개</RowText>
            <Switch
              trackColor={{false: '#767577', true: '#FF6C63'}}
              thumbColor={onlyMe ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setOnlyMe(!onlyMe)}
              value={onlyMe}
              style={{marginLeft: nomalizes[50]}}
            />
          </RowBox>
        </ScrollView>
      </Container>
    </>
  );
};

export default FoodAddInput;
