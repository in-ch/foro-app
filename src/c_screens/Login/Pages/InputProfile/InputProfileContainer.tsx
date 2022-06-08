/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import InputProfilePresenter from './InputProfilePresenter';
import {isAndroid} from '@utills/constants';
import {API_URL} from '~/apollo/client';
import {InputProfileProp} from './InputProfile';

const InputProfileContainer = ({navigation, route}: InputProfileProp) => {
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<null | string>(route?.params?.profile);
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
          console.log('1111111 ', response);
          setIsProfileLoading(false);
        } else if (response.errorCode) {
          console.log('2 ', response.errorCode);
          setIsProfileLoading(false);
        } else if (response.errorMessage) {
          console.log('3 ', response.errorMessage);
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
              await fetch(`${API_URL}/imgUploads`, {
                // 서버에 업로드 요청을 보냄. 나중에 배포 버전 서버로 바꿔야 함.
                // 안드로이드에서 실험할 때는 npm run androidTcp 명령어 emulator 실행 때 마다 쳐야함.
                method: 'POST',
                headers: {
                  'content-type': 'multipart/form-data',
                },
                body: formData,
              })
            ).json();
            setProfile(url);
            setIsProfileLoading(false);
          } catch (error) {
            console.log('이미지 등록 에러 등장 ------------------------------');
            console.log(JSON.stringify(error));
          }
        } else {
          console.log('5 ', response);
          setIsProfileLoading(false);
        }
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <InputProfilePresenter
        isProfileLoading={isProfileLoading}
        GoBack={GoBack}
        GoToHome={GoToHome}
        showImagePicker={showImagePicker}
        nickname={nickname}
        setNickname={setNickname}
      />
    </>
  );
};

export default InputProfileContainer;
