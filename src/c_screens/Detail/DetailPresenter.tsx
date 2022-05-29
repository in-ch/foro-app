/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {Platform, Switch, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import Toast from 'react-native-easy-toast';

import HeaderX from '@components/Header/HeaderX';
import TextInput from '@components/TextInput';
import {cHeight, nomalizes, statusBarHeight} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {SizedBox} from '@components/SizedBox';
import {FoodOutputData} from '~/types/Food';
import {numberToWeek} from '@utills/numberToWeek';

const Container = styled.KeyboardAvoidingView``;

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
  color: #3b3b3b;
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
const RowBoxCenter = styled.View`
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
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
const Button = styled.TouchableOpacity`
  width: ${nomalizes[120]}px;
  height: ${nomalizes[35]}px;
  background-color: #ff6c63;
  display: flex;
  border-radius: ${nomalizes[10]}px;
  margin-top: ${nomalizes[20]}px;
  margin-left: ${nomalizes[10]}px;
  margin-right: ${nomalizes[10]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[14]}px;
`;

interface ColorProps {
  color: string;
}
interface Props {
  goToBack: () => void;
  data: FoodOutputData;
  consumed: boolean;
  onlyMe: boolean;
  memo: string;
  setConsumed: (value: boolean) => void;
  setOnlyMe: (value: boolean) => void;
  setMemo: (value: string) => void;
  handleUpdate: () => void;
  handleDelete: () => void;
  toastRef: any;
}
const DetailPresenter = ({
  goToBack,
  data,
  consumed,
  onlyMe,
  memo,
  setConsumed,
  setOnlyMe,
  setMemo,
  handleUpdate,
  handleDelete,
  toastRef,
}: Props) => {
  const keywords = String(data?.keyword).split(',');
  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight}>
      <HeaderX text="식품 상세" button={goToBack} />
      <ScrollView>
        <Box>
          <Heading>{data?.category?.name}</Heading>
          <RowBox>
            <Mark color={String(data?.category?.color)} />
            <TText>{data?.name}</TText>
          </RowBox>
        </Box>
        <Box>
          <Heading>식품등록일</Heading>
          <Sub>
            {moment(new Date(`${data?.createdAt}`)).format('YY.MM.DD')}(
            {numberToWeek(moment(new Date(`${data?.createdAt}`)).isoWeekday())})
          </Sub>
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>소비기한</Heading>
          <Sub>
            {moment(new Date(`${data?.dday}`)).format('YY.MM.DD')}(
            {numberToWeek(moment(new Date(`${data?.dday}`)).isoWeekday())})
          </Sub>
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>알림 예정일</Heading>
          <Row>
            <DDay>D-2</DDay>
            <Sub>
              {moment(new Date(`${data?.dday}`))
                .add(Number(-2), 'days')
                .format('YY.MM.DD')}
              ({numberToWeek(moment(new Date(`${data?.dday}`)).isoWeekday())})
            </Sub>
          </Row>
          <SizedBox.Custom margin={nomalizes[20]} />
          <Heading>기타 메모</Heading>
          <Row>
            <TextInput
              value={memo}
              setValue={setMemo}
              maxLength={15}
              placeholder="기타 메모"
            />
          </Row>
        </Box>
        <Box>
          <Heading>유의 키워드</Heading>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {keywords?.map(keywor => {
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
              onChange={() => setOnlyMe(!onlyMe)}
              trackColor={{false: '#767577', true: '#FF6C63'}}
              thumbColor={true ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={onlyMe}
              style={{marginLeft: 10}}
            />
          </RowBoxSwitch>
          <SizedBox.Custom margin={nomalizes[10]} />
          <RowBoxSwitch>
            <RowText>소비 완료</RowText>
            <Switch
              onChange={() => setConsumed(!consumed)}
              trackColor={{false: '#767577', true: '#FF6C63'}}
              thumbColor={true ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={consumed}
              style={{marginLeft: 10}}
            />
          </RowBoxSwitch>
          <RowBoxCenter>
            <Button onPress={handleUpdate}>
              <ButtonText>수정</ButtonText>
            </Button>
            <Button onPress={handleDelete}>
              <ButtonText>삭제</ButtonText>
            </Button>
          </RowBoxCenter>
          <SizedBox.Custom margin={nomalizes[40]} />
        </Box>
        <Toast
          ref={toastRef}
          positionValue={cHeight * 0.5}
          fadeInDuration={200}
          fadeOutDuration={1200}
        />
        <SizedBox.Custom margin={nomalizes[30]} />
      </ScrollView>
    </Container>
  );
};

export default DetailPresenter;
