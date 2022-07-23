import {useMutation, useReactiveVar} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';

import {FriendAddProps} from './FriendAdd';
import FriendAddPresenter from './FriendAddPresenter';
import {UserSearchData} from '~/types/User';
import {tokenUserNo} from '~/apollo/client';
import {LOAD_USER_BY_NAME} from '@services/mutations/user';

const FriendAddContainer = ({navigation}: FriendAddProps) => {
  const [text, setText] = useState<string>('');
  const [userData, setUserData] = useState<UserSearchData[]>([]);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const userNo = useReactiveVar(tokenUserNo);

  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const onClickUser = (userName: string) => {
    setSelectedUserName(userName);
    setSelectModal(true);
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
