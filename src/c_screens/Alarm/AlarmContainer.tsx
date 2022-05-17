import React from 'react';
import {AlarmProps} from './Alarm';
import AlarmPresenter from './AlarmPresenter';

const AlarmContainer = ({navigation}: AlarmProps) => {
  const GoToBack = () => {
    navigation.goBack();
  };
  return <AlarmPresenter GoToBack={GoToBack} />;
};

export default AlarmContainer;
