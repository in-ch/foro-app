import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
        console.log('이동을 실시합니다.');
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
};

export default Notification;
