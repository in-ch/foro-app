import React, {useState} from 'react';
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';

import {UPDATE_USER} from '@services/mutations/user';
import {LOAD_USER} from '@services/queries/user';
import {SettingProps} from './Setting';
import SettingPresenter from './SettingPresetner';
import {tokenUserNo} from '~/apollo/apollo';

const SettingContainer = ({navigation}: SettingProps) => {
  const userNo = useReactiveVar(tokenUserNo);
  const [neighborShareAbled, setNeighborShareAbled] = useState<boolean>(false); // 이웃의 나눔 요청 받기
  const [neighborShareNewsAbled, setNeighborShareNewsAbled] =
    useState<boolean>(false); // 이웃의 식품 공유 소식 받기
  const [loading, setLoading] = useState<boolean>(true);

  useQuery(LOAD_USER, {
    variables: {
      userNo,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: async d => {
      await setNeighborShareAbled(d?.loadUser?.alarmNeighborShareRequest);
      await setNeighborShareNewsAbled(
        d?.loadUser?.alarmNeighborFoodSharingNews,
      );
      setLoading(false);
    },
  });

  const goBack = () => {
    navigation.goBack();
  };
  const goToTerms = () => {
    navigation.navigate('Terms', {});
  };
  const goToPersonalPolicy = () => {
    navigation.navigate('PersonalPolicy', {});
  };

  const handleNeighborShareAbled = async () => {
    await setNeighborShareAbled(!neighborShareAbled);
    await mutationUpdateUser();
  };
  const handleNeighborShareNewsAbled = async () => {
    await setNeighborShareNewsAbled(!neighborShareNewsAbled);
    await mutationUpdateUser();
  };

  const [mutationUpdateUser] = useMutation(UPDATE_USER, {
    variables: {
      user: {
        alarmNeighborShareRequest: neighborShareAbled,
        alarmNeighborFoodSharingNews: neighborShareNewsAbled,
      },
      userNo,
    },
    onCompleted: d => {
      console.log('성공 : ' + JSON.stringify(d));
    },
    onError: e => {
      console.log('에러 : ' + JSON.stringify(e));
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
              nickname: dataUserQuery?.loadUser.nickname,
              profile: dataUserQuery?.loadUser.profile,
              alarmNeighborShareRequest: neighborShareAbled,
              alarmNeighborFoodSharingNews: neighborShareNewsAbled,
            },
          },
        });
      }
    },
  });

  return (
    <SettingPresenter
      GoBack={goBack}
      goToTerms={goToTerms}
      goToPersonalPolicy={goToPersonalPolicy}
      handleNeighborShareAbled={handleNeighborShareAbled}
      handleNeighborShareNewsAbled={handleNeighborShareNewsAbled}
      neighborShareAbled={neighborShareAbled}
      neighborShareNewsAbled={neighborShareNewsAbled}
      loading={loading}
    />
  );
};

export default SettingContainer;
