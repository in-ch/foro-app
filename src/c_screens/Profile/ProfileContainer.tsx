import {useQuery, useReactiveVar} from '@apollo/client';
import React from 'react';
import {tokenUserNo} from '~/apollo/apollo';
import {LOAD_USER} from '@services/queries/user';
import {ProfileProps} from './Profile';
import ProfilePresenter from './ProfilePresenter';

const ProfileContainer = ({navigation}: ProfileProps) => {
  const goBack = () => {
    navigation.goBack();
  };
  const goToProfileEdit = () => {
    navigation.navigate('ProfileEdit', {
      profile: data?.loadUser?.profile,
      nickname: data?.loadUser?.nickname,
    });
  };
  const userNo = useReactiveVar(tokenUserNo);
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
  });
  return (
    <ProfilePresenter
      profile={data?.loadUser?.profile}
      nickname={data?.loadUser?.nickname}
      goBack={goBack}
      goToProfileEdit={goToProfileEdit}
    />
  );
};

export default ProfileContainer;
