/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {Text, useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import {nomalizes} from '@utills/constants';
import MyRefrigerator from './routes/MyRefrigerator';
import FriendRefrigerator from './routes/FriendRefrigerator';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

interface Props {
  GoBack: () => void;
  goToDetail: (value: number) => void;
}
interface PProps {
  route: any;
}

const SearchPresenter = ({GoBack, goToDetail}: Props) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: '나의 냉장고'},
    {key: 'second', title: '이웃 냉장고'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={{backgroundColor: '#fff', height: nomalizes[35]}}
      indicatorStyle={{
        backgroundColor: '#FF6258',
        width: '40%',
        // width: '90%',
        marginLeft: '5%',
        height: 2,
      }}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            color: focused ? '#000' : '#acacac',
            margin: 8,
            fontSize: nomalizes[10],
            fontWeight: 'bold',
            fontFamily: 'Pretendard',
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = ({route}: PProps) => {
    switch (route.key) {
      case 'first':
        return <MyRefrigerator goToDetail={goToDetail} />;
      case 'second':
        return <FriendRefrigerator />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header text="검색하기" back={GoBack} />

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

export default SearchPresenter;
