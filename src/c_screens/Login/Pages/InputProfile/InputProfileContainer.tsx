import React, {useState} from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import InputProfilePresenter from './InputProfilePresenter';
import {isAndroid} from '@utills/constants';
import {API_URL} from '~/apollo/client';
import {InputProfileProp} from './InputProfile';
import {Alert} from 'react-native';

const InputProfileContainer = ({navigation, route}: InputProfileProp) => {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>(
    'https://fooro.s3.ap-northeast-2.amazonaws.com/Account.png',
  );
  const [nickname, setNickname] = useState<null | string>(
    route?.params?.nickname,
  );
  const GoBack = () => {
    navigation.goBack();
  };
  const GoToHome = () => {
    navigation.navigate('Home', {});
  };

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
            Alert.alert('이미지 등록에 오류가 발생했습니다.');
          }
        } else {
          Alert.alert('이미지 등록에 오류가 발생했습니다.');
          setIsProfileLoading(false);
        }
      });
    } catch (error) {
      Alert.alert('이미지 등록에 오류가 발생했습니다.');
      throw error;
    }
  };

  return (
    <>
      <InputProfilePresenter
        isProfileLoading={isProfileLoading}
        profileLoading={profileLoading}
        GoBack={GoBack}
        GoToHome={GoToHome}
        showImagePicker={showImagePicker}
        nickname={nickname}
        setNickname={setNickname}
        profile={profile}
      />
    </>
  );
};

export default InputProfileContainer;
