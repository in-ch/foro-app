import React from 'react';
import UserAddPresenter from './UserAddPresenter';
import {UserAddProps} from './UserAdd';
import {useReactiveVar} from '@apollo/client';
import {tokenUserNo} from '~/apollo/client';

const UserContainer = ({navigation, route}: UserAddProps) => {
  console.log('보낸 유저' + route?.params?.from);
  const userNo = useReactiveVar(tokenUserNo);
  if (userNo === null || userNo === undefined) {
    // 유저가 없다면
    navigation.reset({routes: [{name: 'Login', params: {}}]});
  }
  return <UserAddPresenter />;
};

export default UserContainer;
