import React, {useState} from 'react';
import KakaoShareLink from 'react-native-kakao-share-link';

import {NeighborProp} from './ Neighbor';
import NeighborPresenter from './ NeighborPresenter';
import {tokenUserNo} from '~/apollo/apollo';
import {useReactiveVar} from '@apollo/client';

const NeighborContainer = ({navigation}: NeighborProp) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const onShowModal = () => {
    setModalShow(!modalShow);
  };

  const userNo = useReactiveVar(tokenUserNo);
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
    />
  );
};

export default NeighborContainer;
