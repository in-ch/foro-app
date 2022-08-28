/* eslint-disable no-shadow */
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';
import KakaoShareLink from 'react-native-kakao-share-link';
import {tokenUserNo} from 'apollo/client';

import {SHARE_FOOD, TOTAL_SHARE_FOOD} from '@services/mutations/alarm';
import {SEND_PUSH} from '@services/mutations/push';
import {LOAD_FOOD_DATA} from '@services/queries/food';
import {LOAD_FRIEND_FOOD} from '@services/queries/friend';
import {LOAD_USER} from '@services/queries/user';

import {ShareProps} from './Share';
import SharePresenter from './SharePresenter';

const ShareContainer = ({navigation, route}: ShareProps) => {
  const [userIds, setUserIds] = useState<any>([]);
  const [totalShareUsers, setTotalShareUsers] = useState<any>([]);
  const [quickShare, setQuickShare] = useState<boolean>(false); // 퀵 쉐어인지
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const userNo = useReactiveVar(tokenUserNo);
  // const [text1, setText1] = useState(''); // 메시지1
  // const [text2, setText2] = useState(''); // 메시지2
  // const [alarmNo, setAlarmNo] = useState(0); // 카카오톡 공유 알림 no
  const [, setText1] = useState(''); // 메시지1
  const [, setText2] = useState(''); // 메시지2
  const [, setAlarmNo] = useState(0); // 카카오톡 공유 알림 no

  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const [mutationTotalShare] = useMutation(TOTAL_SHARE_FOOD, {
    variables: {
      foodNo: route?.params?.foodNo,
      users: quickShare ? totalShareUsers : String(userIds),
      userNo,
    },
  });
  const [mutationSendPush] = useMutation(SEND_PUSH);

  const handleEvent = async () => {
    setSelectModal(false);
    showToast('전체 공유가 완료되었습니다.');
    mutationTotalShare({
      onCompleted: () => {
        loadFoodData({
          variables: {
            foodNo: route?.params?.foodNo,
          },
        });
      },
      onError: e => {
        console.log(JSON.stringify(e));
      },
    });

    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  const handleSubmit = (quick: boolean) => {
    if (quick) {
      setQuickShare(true);
    } else {
      setQuickShare(false);
    }
    setSelectModal(true);
  };

  const kakaoshare = async () => {
    try {
      await mutationLoadUserData();
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleClicked = async (id: number) => {
    // 만약 값이 이미 포함되어 있다면
    if (userIds.indexOf(id) !== -1) {
      let filtered = userIds.filter((element: number) => element !== id);
      await setUserIds(filtered);
    } else {
      await setUserIds([...userIds, id]);
    }
  };
  const GoBack = () => {
    navigation.goBack();
  };

  const toastRef = useRef<any>(null);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  const {data: friendsData} = useQuery(LOAD_FRIEND_FOOD, {
    variables: {
      userNo,
    },
    onCompleted: async d => {
      let map: number[] = [];
      d?.loadFriendFood?.map((user: {no: number}) => {
        map.push(user.no);
      });
      await setTotalShareUsers(map);
    },
    fetchPolicy: 'network-only',
  });

  const [mutationLoadUserData] = useLazyQuery(LOAD_USER, {
    variables: {
      userNo,
    },
    onCompleted: async d => {
      await setText1(d?.loadUser?.nickname);
      await mutationShareFood();
      await mutationLoadFoodData({
        onCompleted: async d => {
          await setText2(d?.loadFoodData?.name);
          await KakaoShareLink.sendText({
            text: '푸드제로 앱을 공유해줬어요!',
            // text: `${text1}님이 ${text2}을(를) 공유하셨습니다.`,
            link: {
              webUrl: 'kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1',
              mobileWebUrl:
                'kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1',
            },
            buttons: [
              {
                title: '음식물 제로에 참여하기',
                link: {
                  webUrl: 'kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1',
                  mobileWebUrl:
                    'kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1',
                },
              },
            ],
          });
        },
      });
    },
  });

  const [mutationLoadFoodData] = useLazyQuery(LOAD_FOOD_DATA, {
    variables: {
      foodNo: route?.params?.foodNo,
    },
    onCompleted: async d => {
      await setText2(d?.loadFoodData?.name);
    },
  });

  const [loadFoodData] = useLazyQuery(LOAD_FOOD_DATA, {
    onCompleted: d => {
      userIds.map((userId: number) => {
        mutationSendPush({
          variables: {
            userNo: userId,
            title: `${d?.loadFoodData?.name}이(가) 전체 공유되었어요!`,
            body: '바로 공유를 받아보세요!',
            type: 3,
          },
        });
      });
    },
  });

  const [mutationShareFood] = useMutation(SHARE_FOOD, {
    variables: {
      foodNo: route?.params?.foodNo,
      userNo: userNo,
    },
    onCompleted: async d => {
      await setAlarmNo(d?.shareFood?.no);
    },
    onError: e => {
      console.log(JSON.stringify(e));
    },
  });

  return (
    <SharePresenter
      GoBack={GoBack}
      handleClicked={handleClicked}
      userIds={userIds}
      kakaoshare={kakaoshare}
      selectModal={selectModal}
      cancelSelectModal={cancelSelectModal}
      handleEvent={handleEvent}
      handleSubmit={handleSubmit}
      toastRef={toastRef}
      friendsData={friendsData}
    />
  );
};

export default ShareContainer;
