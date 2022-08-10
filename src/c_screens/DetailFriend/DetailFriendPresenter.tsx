/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import Toast from 'react-native-easy-toast';

import HeaderX from '@components/Header/HeaderX';
import TextInput from '@components/TextInput';
import {SizedBox} from '@components/SizedBox';
import {cHeight, nomalizes, statusBarHeight} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {numberToWeek} from '@utills/numberToWeek';
import {FoodOutputData} from '~/types/Food';

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
  font-family: 'Pretendard';
`;
const Sub = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #3b3b3b;
  font-family: 'Pretendard';
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
  font-family: 'Pretendard';
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
const VView = styled.View``;
const RequestButton = styled.TouchableOpacity`
  height: ${nomalizes[40]}px;
  margin-bottom: ${nomalizes[30]}px;
  width: 90%;
  margin-left: 5%;
  background-color: #ff6c63;
  border-radius: ${nomalizes[10]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const RequestButtonText = styled.Text`
  color: white;
  font-size: ${nomalizes[12]}px;
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
  handleRequest: (value: number, value2: number) => void;
  toastRef: any;
}
const DetailFriendPresenter = ({
  goToBack,
  data,
  memo,
  toastRef,
  handleRequest,
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
              setValue={() => console.log('놉')}
              maxLength={15}
              placeholder="기타 메모"
            />
          </Row>
        </Box>
        <Box>
          <Heading>유의 키워드</Heading>
          <VView style={{display: 'flex', flexDirection: 'row'}}>
            {keywords?.length < 1 ||
              (keywords?.length === 1 && keywords[0] === '' ? (
                <TText>유의 키워드가 없습니다.</TText>
              ) : (
                keywords?.map(keywor => {
                  console.log(keywords);
                  return (
                    <HashTag>
                      <HashTagText>{keywor}</HashTagText>
                    </HashTag>
                  );
                })
              ))}
          </VView>
          <SizedBox.Custom margin={nomalizes[20]} />
        </Box>
        <Box>
          <RequestButton onPress={() => handleRequest(data?.no, data?.user.no)}>
            <RequestButtonText>공유 요청하기</RequestButtonText>
          </RequestButton>
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

export default DetailFriendPresenter;
