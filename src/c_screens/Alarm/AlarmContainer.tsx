import {useQuery, useReactiveVar} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {tokenUserNo} from 'apollo/client';
import {useRoute} from '@react-navigation/native';

import {AlarmProps} from './Alarm';
import AlarmPresenter from './AlarmPresenter';
import {LOAD_ALARM} from '@services/queries/alarm';
import {Alert} from 'react-native';

const AlarmContainer = ({navigation}: AlarmProps) => {
  const route = useRoute();
  const userNo = useReactiveVar(tokenUserNo);
  const [backLoading, setBackLoading] = useState<boolean>(false);
  const GoToBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      setBackLoading(true);
      GoToHome();
    }
  };
  const GoToHome = () => {
    navigation.reset({routes: [{name: 'Home', params: {}}]});
  };
  const GotoFriendAgenda = (userId: number) => {
    navigation.navigate('FriendAgenda', {userId});
  };
  const {data: myAlarm, loading} = useQuery(LOAD_ALARM, {
    variables: {
      userNo,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    console.log('------------------');
    console.log(route);
    Alert.alert(`${route.params}`);
  }, [route]);

  return (
    <AlarmPresenter
      GoToBack={GoToBack}
      GoToHome={GoToHome}
      myAlarm={myAlarm?.loadAlarm}
      loading={loading}
      backLoading={backLoading}
      GotoFriendAgenda={GotoFriendAgenda}
    />
  );
};

export default AlarmContainer;
