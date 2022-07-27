/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {tokenUserNo} from 'apollo/client';

import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import {useMutation, useReactiveVar} from '@apollo/client';
import {SEARCH_FOOD_USER} from '@services/mutations/food';
import {numberToWeek} from '@utills/numberToWeek';

const Container = styled.View``;
const ResultContainer = styled.View`
  width: 100%;
  height: ${nomalizes[500]}px;
`;
const Result = styled.TouchableOpacity`
  width: 90%;
  margin-left: 5%;
  padding-left: ${nomalizes[10]}px;
  height: ${nomalizes[30]}px;
  margin-top: ${nomalizes[5]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TText = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #000000;
  font-family: 'Pretendard';
`;
const DDay = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #a8a8a8;
  font-family: 'Pretendard';
`;

interface Props {
  goToDetail: (value: number) => void;
}

const MyRefrigerator = ({goToDetail}: Props) => {
  const [text, setText] = useState<string>('');
  const [mutationSearchFoodUser, {data}] = useMutation(SEARCH_FOOD_USER);
  const userNo = useReactiveVar(tokenUserNo);
  const Search = () => {
    mutationSearchFoodUser({
      variables: {
        userNo,
        keyword: text.trim(),
      },
      onCompleted: d => {
        console.log(d);
      },
    });
  };
  useEffect(() => {
    if (text.trim() !== '') {
      Search();
    }
  }, [text]);
  return (
    <Container>
      <SizedBox.Custom margin={nomalizes[30]} />
      <SearchInput
        onSubmit={() => console.log('asdf')}
        value={text}
        setValue={(value: string) => setText(value)}
      />
      <ResultContainer>
        <ScrollView>
          {data?.searchFoodUser?.map((result: any) => {
            return (
              <Result onPress={() => goToDetail(result.no)}>
                <TText>{result.name}</TText>
                <DDay>
                  {moment(new Date(`${result?.createdAt}`)).format('YY.MM.DD')}(
                  {numberToWeek(
                    moment(new Date(`${result?.createdAt}`)).isoWeekday(),
                  )}
                  ) 등록
                </DDay>
              </Result>
            );
          })}
        </ScrollView>
      </ResultContainer>
    </Container>
  );
};

export default MyRefrigerator;
