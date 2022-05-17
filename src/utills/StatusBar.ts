import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StatusBar, Platform} from 'react-native';

const StatusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

module.exports = {
  StatusBarHeight: StatusBarHeight,
};
