import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Toast from 'react-native-easy-toast';

import {SizedBox} from '@components/SizedBox';
import TextInput from '@components/TextInput';
import Loading from '@components/Loading';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-left: 5%;
  padding-right: 5%;
`;
const TextContainer = styled.View`
  flex: 2;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const InputContainer = styled.View`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.View`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: ${nomalizes[25]}px;
`;
const Button = styled.TouchableOpacity<IsOkProps>`
  width: 100%;
  height: ${nomalizes[40]}px;
  border-radius: ${nomalizes[8]}px;
  background-color: ${props => (props.isOk ? '#FF6258' : '#dfdfdf')};
  display: flex;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text<IsOkProps>`
  font-size: ${nomalizes[14]}px;
  font-family: 'Pretendard';
  color: ${props => (props.isOk ? '#fff' : '#000')};
`;
const Heading = styled.Text`
  font-size: ${nomalizes[16]}px;
  font-family: 'Pretendard';
  font-weight: bold;
`;
const SubText = styled.Text`
  font-size: ${nomalizes[12]}px;
  font-family: 'Pretendard';
  font-weight: normal;
  margin-top: ${nomalizes[2]}px;
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
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const VView = styled.View``;
const AActivityIndicator = styled.ActivityIndicator``;

interface IsOkProps {
  isOk: boolean;
}
interface Props {
  GoBack: () => void;
  UpdateUser: () => void;
  isProfileLoading: boolean;
  profileLoading: boolean;
  loading: boolean;
  showImagePicker: () => void;
  nickname: string | null;
  setNickname: (value: string) => void;
  profile: string;
  isOk: boolean;
  toastRef: any;
}

const InputProfilePresenter = ({
  UpdateUser,
  isProfileLoading,
  profileLoading,
  loading,
  showImagePicker,
  nickname,
  setNickname,
  profile,
  isOk,
  toastRef,
}: Props) => {
  return (
    <>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {isProfileLoading && <Loading />}
        <SizedBox.Custom margin={nomalizes[30]} />
        <TextContainer>
          <Heading>반갑습니다!</Heading>
          <SizedBox.Custom margin={nomalizes[25]} />
          <SubText>Fooro에서 사용하실 닉네임과 프로필 사진을</SubText>
          <SubText>설정해주세요</SubText>
        </TextContainer>
        <InputContainer>
          <ImageContainer onPress={showImagePicker}>
            {profileLoading && (
              <SkeletonPlaceholder speed={1500}>
                <VView style={{width: nomalizes[66], height: nomalizes[66]}} />
              </SkeletonPlaceholder>
            )}
            <IImage source={{uri: profile}} />
          </ImageContainer>
          <SizedBox.Custom margin={nomalizes[20]} />
          <TextInput
            value={String(nickname)}
            setValue={(value: string) => setNickname(value)}
            maxLength={15}
            onlyBottom={true}
          />
        </InputContainer>
        <ButtonContainer>
          <Button isOk={isOk} onPress={() => UpdateUser()}>
            <TText isOk={isOk}>확 인</TText>
          </Button>
        </ButtonContainer>
      </Container>
      {loading && (
        <LoadingContainer>
          <AActivityIndicator animating={true} size="small" color="#000" />
        </LoadingContainer>
      )}
      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.5}
        fadeInDuration={200}
        fadeOutDuration={1200}
      />
    </>
  );
};

export default InputProfilePresenter;
