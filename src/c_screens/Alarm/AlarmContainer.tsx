import {useQuery, useReactiveVar} from '@apollo/client';
import React from 'react';
import {tokenUserNo} from 'apollo/client';

import {AlarmProps} from './Alarm';
import AlarmPresenter from './AlarmPresenter';
import {LOAD_ALARM} from '@services/queries/alarm';

const AlarmContainer = ({navigation}: AlarmProps) => {
  const userNo = useReactiveVar(tokenUserNo);
  const GoToBack = () => {
    navigation.goBack();
  };
  const GotoFriendAgenda = (userId: number) => {
    navigation.navigate('FriendAgenda', {userId});
  };
  const {data: myAlarm, loading} = useQuery(LOAD_ALARM, {
    variables: {
      userNo,
    },
    onCompleted: d => {
      console.log(d);
    },
    onError: e => {
      console.log(JSON.stringify(e));
    },
    fetchPolicy: 'network-only',
  });
  return (
    <AlarmPresenter
      GoToBack={GoToBack}
      myAlarm={myAlarm?.loadAlarm}
      loading={loading}
      GotoFriendAgenda={GotoFriendAgenda}
    />
  );
};

export default AlarmContainer;
