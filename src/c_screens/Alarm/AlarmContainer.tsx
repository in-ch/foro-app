import {useQuery, useReactiveVar} from '@apollo/client';
import React, {useState} from 'react';
import {tokenUserNo} from 'apollo/client';

import {AlarmProps} from './Alarm';
import AlarmPresenter from './AlarmPresenter';
import {LOAD_ALARM} from '@services/queries/alarm';

const AlarmContainer = ({navigation}: AlarmProps) => {
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
