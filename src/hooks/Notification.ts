import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';
import {Linking} from 'react-native';

const Notification = (
  title: string | undefined,
  message: string,
  GoToAlarm: any,
) => {
  PushNotification.configure({
    onRegister: function () {},
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
      if (notification.userInteraction) {
        GoToAlarm();
      }
    },
    onAction: function () {
      console.log('push ACTION==========');
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
  });

  PushNotification.channelExists('notification', function (exists) {
    if (!exists) {
      // notification 권한(채널)이 없으면 생성해 준다.
      PushNotification.createChannel(
        {
          channelId: 'notification', // (required)
          channelName: 'teshPush', // (required)
          playSound: false,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  });
  PushNotification.localNotification({
    channelId: 'notification',
    title, // (optional)
    message, // (required)
  });

  useEffect(() => {
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);

    PushNotificationIOS.requestPermissions().then(
      data => {
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      data => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  const onRegistered = (deviceToken: any) => {
    console.log('Registered For Remote Push', `Device Token: ${deviceToken}`);
  };

  const onRegistrationError = (error: {code: any; message: any}) => {
    console.log(`Error (${error.code}): ${error.message}`);
  };

  const onRemoteNotification = () => {
    Linking.openURL('kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1');
  };

  const onLocalNotification = () => {
    Linking.openURL('kakao8e1ff68c09e6b4bb069c110e76d314df://app/alarm/1');
  };
};

export default Notification;
