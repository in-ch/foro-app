import React, {useState} from 'react';
import KakaoShareLink from 'react-native-kakao-share-link';

import {NeighborProp} from './ Neighbor';
import NeighborPresenter from './ NeighborPresenter';
import {tokenUserNo} from '~/apollo/client';
import {useQuery, useReactiveVar} from '@apollo/client';
import {LOAD_FRIEND_FOOD} from '@services/queries/friend';

const NeighborContainer = ({navigation}: NeighborProp) => {
  const userNo = useReactiveVar(tokenUserNo);
  const {data: friendsData} = useQuery(LOAD_FRIEND_FOOD, {
    variables: {
      userNo,
    },
    fetchPolicy: 'cache-and-network',
  });

  const goToFriendAdd = () => {
    navigation.navigate('FriendAdd', {});
  };

  const goBack = () => {
    navigation.goBack();
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const onShowModal = () => {
    setModalShow(!modalShow);
  };

  const kakaoshare = async () => {
    try {
      const response = await KakaoShareLink.sendText({
        text: `${userNo}님으로 부터 이웃 추가 요청이 왔습니다.`,
        link: {
          androidExecutionParams: [{key: 'from', value: `${userNo}`}],
          iosExecutionParams: [{key: 'from', value: `${userNo}`}],
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              androidExecutionParams: [{key: 'from', value: `${userNo}`}],
              iosExecutionParams: [{key: 'from', value: `${userNo}`}],
            },
          },
        ],
      });
      console.log(response);
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
  };

  return (
    <NeighborPresenter
      modalShow={modalShow}
      onShowModal={onShowModal}
      goBack={goBack}
      kakaoshare={kakaoshare}
      friendsData={friendsData}
      goToFriendAdd={goToFriendAdd}
    />
  );
};

export default NeighborContainer;
