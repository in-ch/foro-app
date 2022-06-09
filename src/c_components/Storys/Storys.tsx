import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

import {nomalizes} from '@utills/constants';
import Story from './Story';
import {useQuery, useReactiveVar} from '@apollo/client';
import {LOAD_USER} from '@services/queries/user';
import {tokenUserNo} from '~/apollo/apollo';

const Container = styled.View`
  height: ${nomalizes[75]}px;
  background-color: #f5f5f5;
`;
const SScrollView = styled.ScrollView`
  height: ${nomalizes[70]}px;
`;
const Wrapper = styled.View`
  height: ${nomalizes[70]}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${nomalizes[9]}px;
  margin-top: ${nomalizes[5]}px;
`;

const Storys = () => {
  const userNo = useReactiveVar(tokenUserNo);
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
  });
  return (
    <Container>
      <SScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Wrapper>
          <Story
            nickname={data?.loadUser?.nickname}
            profile={data?.loadUser?.profile}
          />
          <Story />
          <Story />
          <Story />
          <Story />
          <Story isPlus={true} />

          <View style={{width: nomalizes[5]}} />
        </Wrapper>
      </SScrollView>
    </Container>
  );
};

export default Storys;
