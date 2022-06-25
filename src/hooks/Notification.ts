import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: function (token) {
    console.log('🥰 TOKEN:', token);
  },
  onNotification: function (notification) {
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

PushNotification.channelExists('testPush', function (exists) {
  if (!exists) {
    // testPush 권한(채널)이 없으면 생성해 준다.
    PushNotification.createChannel(
      {
        channelId: 'testPush', // (required)
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

export const testPush = () => {
  PushNotification.localNotification({
    channelId: 'testPush',
    title: '메시지', // (optional)
    message: '메시지 보냄', // (required)
  });
};

export default testPush;
