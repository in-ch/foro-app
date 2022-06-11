/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useMutation, useReactiveVar} from '@apollo/client';
import Toast from 'react-native-easy-toast';

import {cHeight, isAndroid, nomalizes} from '@utills/constants';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootTabParamList} from '@navigation/RootNavigation';
import {API_URL} from '~/apollo/client';
import Header from '@components/Header/Header';
import {DEUPLICATENICKNAME, UPDATE_USER} from '@services/mutations/user';
import {tokenUserNo} from '~/apollo/apollo';
import {LOAD_USER} from '~/c_services/queries/user';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const ProfileContainer = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  margin-top: ${nomalizes[30]}px;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled.View`
  width: 90%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${nomalizes[10]}px;
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
`;

const TTextInput = styled.TextInput`
  flex: 1;
`;
const ImageContainer = styled.TouchableOpacity`
  width: ${nomalizes[66]}px;
  height: ${nomalizes[66]}px;
  border-radius: ${nomalizes[33]}px;
  overflow: hidden;
  position: relative;
`;
const IImage = styled.Image`
  width: ${nomalizes[66]}px;
  height: ${nomalizes[66]}px;
`;
export interface ProfileEditProps {
  navigation: NavigationProp<RootTabParamList, 'ProfileEdit'>;
  route: RouteProp<RootTabParamList, 'ProfileEdit'>;
}

const ProfileEdit = ({navigation, route}: ProfileEditProps) => {
  const userNo = useReactiveVar(tokenUserNo);
  const [cacheText] = useState<string>(route?.params?.nickname); // 기존 닉네임
  const [cacheImage] = useState<string>(route?.params?.profile); // 기존 프로필
  const [text, setText] = useState<string>(route?.params?.nickname);
  const [profile, setProfile] = useState<string>(route?.params?.profile);
  const [profileLoading, setProfileLoading] = useState<boolean>(false); // 이미지 스켈레톤용 변수
  const toastRef = useRef<any>(null);

  const showToast = useCallback((toast: string) => {
    toastRef.current.show(toast);
  }, []);
  let options: ImageLibraryOptions = {
    quality: 1.0,
    mediaType: 'photo',
  };
  const [mutationDuplicateNickname] = useMutation(DEUPLICATENICKNAME, {
    variables: {
      nickname: text,
    },
    onCompleted: async d => {
      if (d?.duplicateNickname?.length > 0 && cacheText !== text) {
        showToast('중복된 닉네임입니다.');
      } else {
        await mutationUpdateUser();
      }
    },
  });
  const [mutationUpdateUser] = useMutation(UPDATE_USER, {
    variables: {
      user: {
        profile,
        nickname: text,
      },
      userNo,
    },
    onCompleted: () => {
      showToast('프로필 편집이 완료되었습니다.');
    },
    update(cache) {
      let dataUserQuery = cache.readQuery<any>({
        query: LOAD_USER,
        variables: {
          userNo,
        },
      });
      if (dataUserQuery !== undefined) {
        cache.writeQuery({
          query: LOAD_USER,
          variables: {
            userNo,
          },
          data: {
            loadUser: {
              nickname: text,
              profile,
            },
          },
        });
      }
    },
  });
  const handleSubmit = async () => {
    if (cacheText === text && cacheImage === profile) {
      showToast('닉네임 혹은 프로필을 바꿔주세요.');
      return;
    } else if (text.length < 2) {
      showToast('2글자 이상으로 알려주세요.');

      return;
    }
    await mutationDuplicateNickname();
  };
  const showImagePicker = () => {
    try {
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
        } else if (response.errorCode) {
        } else if (response.errorMessage) {
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
          } catch (error) {
            showToast('이미지 등록에 오류가 발생했습니다.');
          }
        } else {
          showToast('이미지 등록에 오류가 발생했습니다.');
        }
      });
    } catch (error) {
      showToast('이미지 등록에 오류가 발생했습니다.');
      throw error;
    }
  };
  return (
    <Container>
      <Header
        text="프로필 편집"
        back={() => navigation.goBack()}
        button={handleSubmit}
      />
      <ProfileContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ImageContainer onPress={showImagePicker}>
          {profileLoading && (
            <SkeletonPlaceholder speed={1500}>
              <View style={{width: nomalizes[66], height: nomalizes[66]}} />
            </SkeletonPlaceholder>
          )}
          <IImage source={{uri: profile}} />
        </ImageContainer>
        <TextContainer
          style={{
            borderBottomColor: '#cacaca',
            borderBottomWidth: 1,
          }}>
          <TTextInput
            placeholder="닉네임 입력 공간"
            placeholderTextColor="#646464"
            maxLength={10}
            value={text}
            onChangeText={(value: string) => setText(value)}
          />
          <Text>{text?.length}/10</Text>
        </TextContainer>
      </ProfileContainer>
      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.5}
        fadeInDuration={200}
        fadeOutDuration={1200}
      />
    </Container>
  );
};

export default ProfileEdit;
