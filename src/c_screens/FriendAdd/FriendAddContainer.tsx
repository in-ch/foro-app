import {useMutation, useReactiveVar} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';

import {FriendAddProps} from './FriendAdd';
import FriendAddPresenter from './FriendAddPresenter';
import {UserSearchData} from 'types/User';
import {tokenUserNo} from 'apollo/client';
import {LOAD_USER_BY_NAME} from '@services/mutations/user';
import {REQUEST_ADD_FRIEND} from '@services/mutations/alarm';
import {SEND_PUSH} from '@services/mutations/push';

const FriendAddContainer = ({navigation}: FriendAddProps) => {
  const [text, setText] = useState<string>('');
  const [userData, setUserData] = useState<UserSearchData[]>([]);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const userNo = useReactiveVar(tokenUserNo);
  const [friendNo, setFriendNo] = useState(0);
  const [friendName, setFriendName] = useState<string>('');

  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const onClickUser = async (userName: string, _friendNo: number) => {
    setSelectedUserName(userName);
    setSelectModal(true);
    setFriendNo(_friendNo);
    mutationRequestAddFriend();
    setFriendName(userName);
  };

  const goBack = () => {
    navigation.goBack();
  };
  const handleChangeText = async (value: string) => {
    setText(value);
    if (value.length > 1) {
      mutationLoadUserByName();
    }
  };

  const [mutationLoadUserByName] = useMutation(LOAD_USER_BY_NAME, {
    variables: {
      nickname: text,
      userNo,
    },
    onCompleted: d => {
      setUserData(d?.loadUserByName);
    },
  });

  const [mutationRequestAddFriend] = useMutation(REQUEST_ADD_FRIEND, {
    variables: {
      userNo,
      friendNo,
    },
    onCompleted: d => {
      console.log('============= 성공', d);
      mutationSendPush();
    },
  });

  const [mutationSendPush] = useMutation(SEND_PUSH, {
    variables: {
      userNo: friendNo,
      title: '친구 요청이 왔습니다.',
      body: `${friendName}님! 새로운 이웃 요청이 왔어요.`,
      type: 1,
    },
    onCompleted: d => {
      console.log(d);
    },
  });

  const toastRef = useRef<any>(null);
  const showToast = useCallback((modalText: string) => {
    toastRef.current.show(modalText);
  }, []);
  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const handleEvent = () => {
    showToast('이웃추가 요청을 보냈습니다.');
    setSelectModal(false);
  };
  const goToFriendAddResult = () => {
    navigation.navigate('FriendAddResult', {foodText: text});
  };
  return (
    <FriendAddPresenter
      goBack={goBack}
      text={text}
      setText={handleChangeText}
      userData={userData}
      toastRef={toastRef}
      selectModal={selectModal}
      setSelectModal={setSelectModal}
      cancelSelectModal={cancelSelectModal}
      handleEvent={handleEvent}
      selectedUserName={selectedUserName}
      onClickUser={onClickUser}
      goToFriendAddResult={goToFriendAddResult}
    />
  );
};

export default FriendAddContainer;
