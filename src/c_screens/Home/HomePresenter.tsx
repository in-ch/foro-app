/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';

import CCalendar from '@components/Calendar/Calendar';
import {nomalizes, statusBarHeight} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import MenuBar from '@components/MenuBar/MenuBar';
import Storys from '@components/Storys/Storys';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';

const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0);
  padding: ${nomalizes[30]}px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ModalButton = styled.TouchableOpacity`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
  border-radius: ${nomalizes[20]}px;
  display: flex;
  background-color: #ff6c63;
  ${cssUtil.doubleCenter};
`;

interface Props {
  GoToAlarm: () => void;
  GoToSearch: () => void;
  GoToFoodAdd: () => void;
  GoToAgenda: () => void;
  GoToDetail: (value: string) => void;
  GoToCategory: () => void;
  GoToNeighbor: () => void;
  GoToSetting: () => void;
  GoToProfile: () => void;
}

const HomePresenter = ({
  GoToAlarm,
  GoToSearch,
  GoToFoodAdd,
  GoToAgenda,
  GoToDetail,
  GoToCategory,
  GoToNeighbor,
  GoToSetting,
  GoToProfile,
}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <SizedBox.Custom
        margin={statusBarHeight}
        style={{
          backgroundColor: '#F4F4F4',
        }}
      />
      <MenuBar
        GoToAlarm={GoToAlarm}
        GoToSearch={GoToSearch}
        GoToCategory={GoToCategory}
        GoToNeighbor={GoToNeighbor}
        GoToSetting={GoToSetting}
        GoToProfile={GoToProfile}
      />
      <Storys />
      <CCalendar GoToAgenda={GoToAgenda} GoToDetail={GoToDetail} />

      <ModalBackground>
        <ModalButton onPress={GoToFoodAdd}>
          <Image
            style={{
              width: nomalizes[18],
              height: nomalizes[18],
            }}
            source={images.plusWhite}
          />
        </ModalButton>
      </ModalBackground>
    </View>
  );
};

export default HomePresenter;
