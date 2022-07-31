/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import {nomalizes} from '@utills/constants';
import FoodAlarm from './routes/FoodAlarm';
import ShareAlarm from './routes/ShareAlarm';
import {AlarmProps} from 'types/Alarm';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const LabelText = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #000;
`;
interface Props {
  GoToBack: () => void;
  GoToHome: () => void;
  myAlarm: AlarmProps[];
  loading: boolean;
  GotoFriendAgenda: (value: number) => void;
}
interface PProps {
  route: any;
  GotoFriendAgenda?: (value: number) => void;
}
const AlarmPresenter = ({
  GoToBack,
  GoToHome,
  myAlarm,
  loading,
  GotoFriendAgenda,
}: Props) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'MY 알림'},
    // {key: 'second', title: '이웃 알림'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{backgroundColor: '#fff', height: nomalizes[35]}}
      indicatorStyle={{
        backgroundColor: '#FF6258',
        // width: '40%',
        width: '90%',
        marginLeft: '5%',
        height: 2,
      }}
      renderLabel={({route, focused}) => (
        <LabelText
          style={{
            color: focused ? '#000' : '#acacac',
            margin: 8,
            fontSize: nomalizes[10],
            fontWeight: 'bold',
            fontFamily: 'Pretendard',
          }}>
          {route.title}
        </LabelText>
      )}
    />
  );

  const renderScene = ({route}: PProps) => {
    switch (route.key) {
      case 'first':
        return (
          <FoodAlarm
            myAlarm={myAlarm}
            loading={loading}
            GotoFriendAgenda={GotoFriendAgenda}
            GoToHome={GoToHome}
          />
        );
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
