/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {nomalizes} from '@utills/constants';
import Story from './Story';
import {useQuery, useReactiveVar} from '@apollo/client';
import {LOAD_USER} from '@services/queries/user';
import {LOAD_FRIEND_FOOD} from '@services/queries/friend';
import {tokenUserNo} from 'apollo/client';

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
const VView = styled.View``;
const TTouchableOpacity = styled.TouchableOpacity``;
interface Props {
  GoToFriendAdd: () => void;
  GoToFriendAgenda: (value: number) => void;
}
const Storys = ({GoToFriendAdd, GoToFriendAgenda}: Props) => {
  const [friends, setFriends] = useState([]);
  const userNo = useReactiveVar(tokenUserNo);
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
    fetchPolicy: 'network-only',
  });

  const {data: friendsData} = useQuery(LOAD_FRIEND_FOOD, {
    variables: {
      userNo,
    },
    onCompleted: d => {
      setFriends(d?.loadFriendFood);
      console.log(friendsData);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <Container>
      <SScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Wrapper>
          <Story
            nickname={data?.loadUser?.nickname}
            profile={data?.loadUser?.profile}
          />

          {friendsData?.loadFriendFood?.map((friend: any) => {
            return (
              <TTouchableOpacity onPress={() => GoToFriendAgenda(friend.no)}>
                <Story nickname={friend.nickname} profile={friend.profile} />
              </TTouchableOpacity>
            );
          })}

          <TouchableOpacity onPress={GoToFriendAdd}>
            <Story isPlus={true} />
          </TouchableOpacity>
          <VView style={{width: nomalizes[5]}} />
        </Wrapper>
      </SScrollView>
    </Container>
  );
};

export default Storys;
