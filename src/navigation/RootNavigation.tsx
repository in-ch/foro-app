/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useReactiveVar} from '@apollo/client';
import {Alert, Linking} from 'react-native';

import Home from '@screens/Home/Home';
import Login from '@screens/Login/Login';
import InputProfile from '@screens/Login/Pages/InputProfile/InputProfile';
import Alarm from '@screens/Alarm/Alarm';
import Search from '@screens/Search/Search';
import FoodAdd from '@screens/FoodAdd/FoodAdd';
import Agenda from '@screens/Agenda/Agenda';
import FoodSearchResult from '@screens/FoodAdd/pages/FoodSearchResult';
import FoodAddInput from '@screens/FoodAdd/pages/FoodAddInput';
import FoodDone from '@screens/FoodAdd/pages/FoodDone';
import Detail from '@screens/Detail/Detail';
import Category from '@screens/Category/Category';
import CategoryAdd from '@screens/Category/page/CategoryAdd';
import CategoryUpdate from '@screens/Category/page/CategoryUpdate';
import Neighbor from '@screens/Neighbor/ Neighbor';
import Setting from '@screens/Setting/Setting';
import Terms from '@screens/Setting/pages/Terms';
import PersonalPolicy from '@screens/Setting/pages/PersonalPolicy';
import Profile from '@screens/Profile/Profile';
import ProfileEdit from '@screens/Profile/pages/ProfileEdit';
import UserAdd from '@screens/UserAdd/UserAdd';
import AgendaNew from '@screens/AgendaNew/AgendaNew';
import Share from '@screens/Share/Share';
import FriendAdd from '@screens/FriendAdd/FriendAdd';
import FriendAddResult from '@screens/FriendAdd/page/FriendAddResult';
import FriendAgenda from '@screens/FriendAgenda/FriendAgenda';
import DetailFriend from '@screens/DetailFriend/DetailFriend';

import {FoodData} from 'types/Food';
import {isLoggedInVar} from 'apollo/client';

export type RootTabParamList = {
  Home: {
    foodNo?: number;
  };
  Login: {};
  Alarm: {};
  Search: {};
  FoodAdd: {};
  InputProfile: {
    profile: string | null;
    nickname: string | null;
  };
  FoodSearchResult: {
    text: string;
  };
  FoodDone: {
    foodAddParams: FoodData;
  };
  Detail: {
    no: number;
  };
  DetailFriend: {
    no: number;
  };
  Category: {};
  CategoryAdd: {};
  CategoryUpdate: {
    no: number;
  };
  Neighbor: {};
  Setting: {};
  Terms: {};
  PersonalPolicy: {};
  Profile: {};
  ProfileEdit: {
    profile: string;
    nickname: string;
  };
  Agenda: {
    selected?: string;
    userId: number;
  };
  AgendaNew: {
    selected?: string;
    userId: number;
  };
  FriendAgenda: {
    userId: number;
  };
  FoodAddInput: {
    food: FoodData;
  };
  UserAdd: {
    from: string; // 요청을 보낸 유저 no
  };
  FriendAdd: {};
  FriendAddResult: {
    foodText: string;
  };
  Share: {
    foodNo: number;
  };
};

const RootNavigation = () => {
  const Stack = createStackNavigator();

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleDeepLink = () => {};
  useEffect(() => {
    handleDeepLink();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="UserAdd"
        component={UserAdd}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Agenda"
        component={Agenda}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AgendaNew"
        component={AgendaNew}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FriendAgenda"
        component={FriendAgenda}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Alarm"
        component={Alarm}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FoodAdd"
        component={FoodAdd}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FriendAddResult"
        component={FriendAddResult}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FriendAdd"
        component={FriendAdd}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FoodSearchResult"
        component={FoodSearchResult}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FoodAddInput"
        component={FoodAddInput}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FoodDone"
        component={FoodDone}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="DetailFriend"
        component={DetailFriend}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="CategoryAdd"
        component={CategoryAdd}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="CategoryUpdate"
        component={CategoryUpdate}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Neighbor"
        component={Neighbor}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PersonalPolicy"
        component={PersonalPolicy}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="InputProfile"
        component={InputProfile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Share"
        component={Share}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
