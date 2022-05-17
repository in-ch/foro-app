/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {Text, useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import {nomalizes} from '~/utills/constants';
import FoodAlarm from './routes/FoodAlarm';
import ShareAlarm from './routes/ShareAlarm';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
interface Props {
  GoToBack: () => void;
}
interface PProps {
  route: any;
}
const AlarmPresenter = ({GoToBack}: Props) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: '식품 알림'},
    {key: 'second', title: '공유 알림'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{backgroundColor: '#fff', height: nomalizes[35]}}
      indicatorStyle={{
        backgroundColor: '#000',
        width: '40%',
        marginLeft: '5%',
        height: 3,
      }}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            color: focused ? '#000' : '#acacac',
            margin: 8,
            fontSize: nomalizes[12],
            fontWeight: 'bold',
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = ({route}: PProps) => {
    switch (route.key) {
      case 'first':
        return <FoodAlarm />;
      case 'second':
        return <ShareAlarm />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header text="알림" back={GoToBack} />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        lazy={true}
        renderTabBar={renderTabBar}
      />
    </Container>
  );
};

export default AlarmPresenter;
