import React from 'react';
import {ProfileProps} from './Profile';
import ProfilePresenter from './ProfilePresenter';

const ProfileContainer = ({navigation}: ProfileProps) => {
  const goBack = () => {
    navigation.goBack();
  };
  const goToProfileEdit = () => {
    navigation.navigate('ProfileEdit', {});
  };
  return <ProfilePresenter goBack={goBack} goToProfileEdit={goToProfileEdit} />;
};

export default ProfileContainer;
