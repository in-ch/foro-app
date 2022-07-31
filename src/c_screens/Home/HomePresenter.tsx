/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import styled from 'styled-components/native';

import CCalendar from '@components/Calendar/Calendar';
import {nomalizes, statusBarHeight} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import MenuBar from '@components/MenuBar/MenuBar';
import Storys from '@components/Storys/Storys';
import IntroApp from '@components/Intro/IntroApp';
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
const IImage = styled.Image``;
const VView = styled.View``;
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
  GoToFriendAdd: () => void;
  GoToFriendAgenda: (value: number) => void;
  Logout: () => void;
  inTroskip: null | boolean | string;
}

interface DisplayProps {
  display: boolean;
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
  GoToFriendAdd,
  GoToFriendAgenda,
  Logout,
  inTroskip,
}: Props) => {
  return (
    <VView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      {/* {inTroskip === false && <IntroApp />} */}
      {inTroskip === true && <IntroApp GoToFoodAdd={GoToFoodAdd} />}
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
        Logout={Logout}
      />
      <Storys
        GoToFriendAdd={GoToFriendAdd}
        GoToFriendAgenda={GoToFriendAgenda}
      />

      <CCalendar GoToAgenda={GoToAgenda} GoToDetail={GoToDetail} />

      <ModalBackground>
        <ModalButton onPress={GoToFoodAdd}>
          <IImage
            style={{
              width: nomalizes[18],
              height: nomalizes[18],
            }}
            source={images.plusWhite}
          />
        </ModalButton>
      </ModalBackground>
    </VView>
  );
};

export default HomePresenter;
