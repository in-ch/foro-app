import React from 'react';
import {useRoute} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
}

const ParamContainer = ({children}: Props) => {
  const route = useRoute();

  console.log(route.params);
  return <>{children}</>;
};

export default ParamContainer;
