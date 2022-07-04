import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: function (token) {
    console.log('🥰 TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log(
      'notification 클릭 시 이벤트 : ' + JSON.stringify(notification),
    );
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function () {},
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
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

export const notification = (title: string | undefined, message: string) => {
  PushNotification.localNotification({
    channelId: 'notification',
    title, // (optional)
    message, // (required)
  });
};

export default notification;
