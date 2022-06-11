import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useMutation, useReactiveVar} from '@apollo/client';

import InputProfilePresenter from './InputProfilePresenter';
import {isAndroid} from '@utills/constants';
import {InputProfileProp} from './InputProfile';
import {DEUPLICATENICKNAME, UPDATE_USER} from '@services/mutations/user';
import {API_URL} from '~/apollo/client';
import {tokenUserNo} from '~/apollo/apollo';

const InputProfileContainer = ({navigation, route}: InputProfileProp) => {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false); // 이미지 스켈레톤용 변수
  const [isOk, setIsOk] = useState<boolean>(false);
  const userNo = useReactiveVar(tokenUserNo);
  const [profile, setProfile] = useState<string>(
    'https://fooro.s3.ap-northeast-2.amazonaws.com/Account.png',
  );
  const toastRef = useRef<any>(null);
  const [nickname, setNickname] = useState<null | string>(
    route?.params?.nickname,
  );
  const [cacheNickname] = useState<null | string>(route?.params?.nickname);
  const GoBack = () => {
    navigation.goBack();
  };
  const UpdateUser = async () => {
    if (isOk) {
      await mutationDuplicateNickname();
    }
  };

  const showToast = useCallback((toast: string) => {
    toastRef.current.show(toast);
  }, []);

  useEffect(() => {
    if (
      String(nickname).length < 2 ||
      nickname === undefined ||
      nickname === null
    ) {
      setIsOk(false);
    } else if (
      profile === 'https://fooro.s3.ap-northeast-2.amazonaws.com/Account.png'
    ) {
      setIsOk(false);
    } else if (profileLoading) {
      setIsOk(false);
    } else {
      setIsOk(true);
    }
  }, [profile, nickname, profileLoading]);

  const [mutationUpdateUser, {loading}] = useMutation(UPDATE_USER, {
    variables: {
      user: {
        profile,
        nickname,
      },
      userNo,
    },
    onCompleted: () => {
      navigation.navigate('Home', {});
    },
  });
  const [mutationDuplicateNickname] = useMutation(DEUPLICATENICKNAME, {
    variables: {
      nickname,
    },
    onCompleted: async d => {
      if (d?.duplicateNickname?.length > 0 && cacheNickname !== nickname) {
        showToast('중복된 닉네임입니다.');
        setIsOk(false);
      } else {
        await mutationUpdateUser();
      }
    },
  });

  // 갤러리에서 이미지 선택
  let options: ImageLibraryOptions = {
    quality: 1.0,
    mediaType: 'photo',
  };
  const showImagePicker = () => {
    setIsProfileLoading(true);
    try {
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          setIsProfileLoading(false);
        } else if (response.errorCode) {
          setIsProfileLoading(false);
        } else if (response.errorMessage) {
          setIsProfileLoading(false);
        } else if (response.assets) {
          let photo = response.assets[0];
          let fileName = photo.fileName?.split('.')[0];

          const formData = new FormData();
          formData.append('file', {
            name: fileName,
            type: 'image/jpeg',
            uri: isAndroid ? photo.uri : photo.uri?.replace('file://', ''),
          });
          try {
            const {url} = await (
              await fetch(`${API_URL}/uploads`, {
                // 안드로이드에서 실험할 때는 npm run androidTcp 명령어 emulator 실행 때 마다 쳐야함.
                method: 'POST',
                headers: {
                  'content-type': 'multipart/form-data',
                },
                body: formData,
              })
            ).json();
            setProfileLoading(true);
            await setProfile(String(url));
            setTimeout(() => {
              setProfileLoading(false);
            }, 2000);
            setIsProfileLoading(false);
          } catch (error) {
            showToast('이미지 등록에 오류가 발생했습니다.');
          }
        } else {
          showToast('이미지 등록에 오류가 발생했습니다.');
          setIsProfileLoading(false);
        }
      });
    } catch (error) {
      showToast('이미지 등록에 오류가 발생했습니다.');
      throw error;
    }
  };

  return (
    <>
      <InputProfilePresenter
        isProfileLoading={isProfileLoading}
        profileLoading={profileLoading}
        loading={loading}
        GoBack={GoBack}
        UpdateUser={UpdateUser}
        showImagePicker={showImagePicker}
        nickname={nickname}
        setNickname={setNickname}
        profile={profile}
        isOk={isOk}
        toastRef={toastRef}
      />
    </>
  );
};

export default InputProfileContainer;
