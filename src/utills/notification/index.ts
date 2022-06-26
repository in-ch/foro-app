import {useAsyncStorage} from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {Linking} from 'react-native';

import {userDeviceToken} from '~/apollo/apollo';
import {notification} from '~/hooks/Notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  if (!(authStatus === 1)) {
    // 권한 실행이 안되어 있을 경우.
    Alert.alert('알림 권한 설정이 필요합니다.');
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root');
    }
  }
}

const Pushinit = () => {
  const [token, setToken] = useState('');
  const {getItem: getFcmItem, setItem: setFcmItem} =
    useAsyncStorage('fcmToken');

  useEffect(() => {
    const getFcmToken = async () => {
      const fcmFS = await getFcmItem();
      const fcmToken = await messaging().getToken();
      if (fcmFS !== fcmToken) {
        setFcmItem(fcmToken); // 회원가입, 로그인할 때 활용
      }
      await userDeviceToken(fcmToken);
      await setToken(fcmToken);
    };

    requestUserPermission();
    messaging().requestPermission();
    messaging().registerDeviceForRemoteMessages();
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      notification(
        remoteMessage.notification?.body,
        String(remoteMessage.notification?.title),
      );
    });
    return unsubscribe;
  }, [getFcmItem, setFcmItem]);

  return token;
};

export default Pushinit;
