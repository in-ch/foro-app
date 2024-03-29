import React, {useCallback, useRef, useState} from 'react';
import KakaoShareLink from 'react-native-kakao-share-link';

import {NeighborProp} from './ Neighbor';
import NeighborPresenter from './ NeighborPresenter';
import {tokenUserNo} from 'apollo/client';
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {LOAD_FRIEND_FOOD} from '@services/queries/friend';
import {DELETE_FRIEND} from '@services/mutations/user';

const NeighborContainer = ({navigation}: NeighborProp) => {
  const userNo = useReactiveVar(tokenUserNo);
  const [friendNo, setFriendNo] = useState<Number>(0);
  const toastRef = useRef<any>(null);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  const {data: friendsData, refetch} = useQuery(LOAD_FRIEND_FOOD, {
    variables: {
      userNo,
    },
    fetchPolicy: 'network-only',
  });

  const [mutationDeleteFriend] = useMutation(DELETE_FRIEND);
  const handleDeleteFriend = () => {
    mutationDeleteFriend({
      variables: {
        userNo,
        friendNo,
      },
      onCompleted: d => {
        console.log(d);
        showToast('이웃 삭제를 완료하였습니다.');
        setModalShow(false);
        refetch();
      },
    });
  };
  const goToFriendAdd = () => {
    navigation.navigate('FriendAdd', {});
  };

  const goBack = () => {
    navigation.goBack();
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const onShowModal = (value: number) => {
    setModalShow(!modalShow);
    setFriendNo(value);
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
      handleDeleteFriend={handleDeleteFriend}
      toastRef={toastRef}
    />
  );
};

export default NeighborContainer;
