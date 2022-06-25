import {useAsyncStorage} from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {userDeviceToken} from '~/apollo/apollo';
import {notification} from '~/hooks/Notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  console.log('권한 : ' + JSON.stringify(authStatus));
  if (!(authStatus === 1)) {
    // 권한 실행이 안되어 있을 경우.
    Alert.alert('알림 권한 설정이 필요합니다.');
  }
  console.log('알림 권한 : ' + authStatus);
}

const Pushinit = () => {
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
      const deviceToken = userDeviceToken(fcmToken);
      console.log('🚒fcm token::', deviceToken);
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
};

export default Pushinit;
