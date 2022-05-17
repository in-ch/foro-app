import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import ProfileContainer from './ProfileContainer';

export interface ProfileProps {
  navigation: NavigationProp<RootTabParamList, 'Profile'>;
}

const Profile = ({navigation}: ProfileProps) => {
  return <ProfileContainer navigation={navigation} />;
};

export default Profile;
