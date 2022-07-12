import React, {useCallback, useRef, useState} from 'react';
import KakaoShareLink from 'react-native-kakao-share-link';

import {ShareProps} from './Share';
import SharePresenter from './SharePresenter';

const ShareContainer = ({navigation, route}: ShareProps) => {
  console.log(route.params.foodNo);
  const [userIds, setUserIds] = useState<any>([]);
  const [selectModal, setSelectModal] = useState<boolean>(false);

  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const handleEvent = () => {
    setSelectModal(false);
    console.log('이벤트 실행');
    showToast('전체 공유가 완료되었습니다.');
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  const handleSubmit = () => {
    setSelectModal(true);
  };

  const kakaoshare = async () => {
    try {
      const response = await KakaoShareLink.sendText({
        text: `${'userNo'}님이 ${'foodName'}을(를) 공유하셨습니다.`,
        link: {
          androidExecutionParams: [{key: 'from', value: `${'userNo'}`}],
          iosExecutionParams: [{key: 'from', value: `${'userNo'}`}],
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              androidExecutionParams: [{key: 'from', value: `${'userNo'}`}],
              iosExecutionParams: [{key: 'from', value: `${'userNo'}`}],
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
    />
  );
};

export default ShareContainer;
