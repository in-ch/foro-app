import {useMutation, useReactiveVar} from '@apollo/client';
import React, {useEffect} from 'react';

import {IntroSkip, logUserIn, tokenUserNo} from '~/apollo/apollo';
import {UPDATE_USER} from '@services/mutations/user';
import Pushinit from '@utills/notification';
import {HomeProps} from './Home';
import HomePresenter from './HomePresenter';

const HomeContainer = ({navigation}: HomeProps) => {
  const userNo = useReactiveVar(tokenUserNo);
  const [mutationUpdateUser] = useMutation(UPDATE_USER);
  const token = Pushinit(); // 푸쉬 관련 코드
  const inTroskip = useReactiveVar(IntroSkip);

  useEffect(() => {
    if (userNo !== null || userNo !== undefined) {
      mutationUpdateUser({
        variables: {
          user: {
            pushToken: token,
          },
          userNo,
        },
      });
    }
  }, [token, mutationUpdateUser, userNo]);

  const GoToAlarm = () => {
    navigation.navigate('Alarm', {});
  };
  const GoToSearch = () => {
    navigation.navigate('Search', {});
  };
  const GoToFoodAdd = () => {
    navigation.navigate('FoodAdd', {});
  };
  const GoToAgenda = () => {
    navigation.navigate('AgendaNew', {userId: Number(userNo)});
  };
  const GoToDetail = (selected: string) => {
    navigation.navigate('AgendaNew', {selected, userId: Number(userNo)});
  };
  const GoToCategory = () => {
    navigation.navigate('Category', {});
  };
  const GoToNeighbor = () => {
    navigation.navigate('Neighbor', {});
  };
  const GoToSetting = () => {
    navigation.navigate('Setting', {});
  };
  const GoToProfile = () => {
    navigation.navigate('Profile', {});
  };
  const Logout = () => {
    logUserIn(null);
    navigation.reset({
      routes: [{name: 'Login', params: {}}],
    });
  };

  return (
    <>
      <HomePresenter
        GoToAlarm={GoToAlarm}
        GoToSearch={GoToSearch}
        GoToFoodAdd={GoToFoodAdd}
        GoToAgenda={GoToAgenda}
        GoToDetail={GoToDetail}
        GoToCategory={GoToCategory}
        GoToNeighbor={GoToNeighbor}
        GoToSetting={GoToSetting}
        GoToProfile={GoToProfile}
        Logout={Logout}
        inTroskip={inTroskip}
      />
    </>
  );
};

export default HomeContainer;
