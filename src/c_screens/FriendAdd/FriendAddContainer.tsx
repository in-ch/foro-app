import {useMutation} from '@apollo/client';
import React, {useState} from 'react';

import {FriendAddProps} from './FriendAdd';
import FriendAddPresenter from './FriendAddPresenter';
import {LOAD_USER_BY_NAME} from '@services/mutations/user';
import {UserSearchData} from '~/types/User';

const FriendAddContainer = ({navigation}: FriendAddProps) => {
  const [text, setText] = useState<string>('');
  const [userData, setUserData] = useState<UserSearchData[]>([]);
  const goBack = () => {
    navigation.goBack();
  };
  const handleChangeText = async (value: string) => {
    console.log(value);
    setText(value);
    if (value.length > 1) {
      mutationLoadUserByName();
    }
  };

  const [mutationLoadUserByName] = useMutation(LOAD_USER_BY_NAME, {
    variables: {
      nickname: text,
    },
    onCompleted: d => {
      console.log(JSON.stringify(d));
      setUserData(d?.loadUserByName);
    },
  });
  return (
    <FriendAddPresenter
      goBack={goBack}
      text={text}
      setText={handleChangeText}
      userData={userData}
    />
  );
};

export default FriendAddContainer;
