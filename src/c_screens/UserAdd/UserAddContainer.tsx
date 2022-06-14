import React from 'react';
import UserAddPresenter from './UserAddPresenter';
import {UserAddProps} from './UserAdd';

const UserContainer = ({navigation, route}: UserAddProps) => {
  console.log('보낸 유저' + route?.params?.from);
  return <UserAddPresenter />;
};

export default UserContainer;
