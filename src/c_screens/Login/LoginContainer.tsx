import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';

import LoginPresenter from './LoginPresenter';
import {hideBottomBar} from '../../apollo/apollo';
import {RootTabParamList} from '../../navigation/RootNavigation';

interface Props {
  navigation: NavigationProp<RootTabParamList, 'Home'>;
}

const LoginContainer = ({navigation}: Props) => {
  const GoToEmailPage = () => {
    navigation.navigate('InputProfile', {});
    console.warn(navigation);
  };
  useEffect(() => {
    hideBottomBar(false);
  }, []);

  return (
    <>
      <LoginPresenter GoToEmailPage={GoToEmailPage} />
    </>
  );
};

export default LoginContainer;
