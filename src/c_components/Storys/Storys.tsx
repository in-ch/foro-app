import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

import {nomalizes} from '@utills/constants';
import Story from './Story';
import {useQuery, useReactiveVar} from '@apollo/client';
import {LOAD_USER} from '@services/queries/user';
import {tokenUserNo} from '~/apollo/client';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
interface Props {
  GoToFriendAdd: () => void;
}
const Storys = ({GoToFriendAdd}: Props) => {
  const userNo = useReactiveVar(tokenUserNo);
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
    fetchPolicy: 'cache-and-network',
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
          <TouchableOpacity onPress={GoToFriendAdd}>
            <Story isPlus={true} />
          </TouchableOpacity>
          <View style={{width: nomalizes[5]}} />
        </Wrapper>
      </SScrollView>
    </Container>
  );
};

export default Storys;
