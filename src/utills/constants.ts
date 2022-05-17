import {Dimensions, Platform, PixelRatio} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const cWidth = Dimensions.get('screen').width;
export const cHeight = Dimensions.get('screen').height - getStatusBarHeight();
export const statusBarHeight = getStatusBarHeight(true); // skipAndroid
export const bottomSpace = getBottomSpace(); // skipAndroid
export const scale = cWidth / 320;

export const nomalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

const hundreds = [
  105, 110, 115, 120, 121, 130, 140, 145, 150, 155, 160, 170, 175, 178, 180,
  190, 198, 200, 205, 210, 220, 230, 233, 240, 245, 248, 250, 270, 300, 310,
  400, 430, 450, 460, 465, 470, 480, 490, 495, 496, 500, 510, 600, 650,
];
const points = [
  1.5, 2.5, 3.5, 4.5, 6.5, 7.5, 8.5, 8.8, 9.3, 9.5, 10.5, 11.5, 11.8, 12.5,
  13.2, 13.5, 14.5, 15.5, 16.5, 21.5, 24.5,
];
export const nomalizes: {
  [key: number]: number;
} = {};
const getNomalizes = () => {
  for (let i = 0; i <= 100; i += 1) {
    nomalizes[i] = nomalize(i);
  }
  hundreds.forEach((h: number) => {
    nomalizes[h] = nomalize(h);
  });
  points.forEach((p: number) => {
    nomalizes[p] = nomalize(p);
  });
};
getNomalizes();

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
