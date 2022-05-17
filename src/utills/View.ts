import {ViewStyle} from 'react-native';

const getShadow = ({
  width,
  height,
  opacity,
  elevation,
}: {
  // iOS
  width?: number;
  height?: number;
  opacity?: number;
  color?: number;
  // Android
  elevation: number;
}): Partial<ViewStyle> => ({
  shadowOffset: {width: width || 0, height: height || 0},
  shadowColor: 'black',
  shadowOpacity: opacity || 0.3,
  elevation,
});

const defaultCardShadow = getShadow({
  width: 0,
  height: 5,
  opacity: 0.2,
  elevation: 5, // android
});

const defaultButtonShadow = getShadow({
  width: 2,
  height: 4,
  opacity: 0.1,
  elevation: 5, // android
});

const defaultButtonShadowSuper = getShadow({
  width: 10,
  height: 50,
  opacity: 0.1,
  elevation: 150, // android
});

export const viewUtill = {
  common: {
    defaultCardShadow,
    defaultButtonShadow,
    defaultButtonShadowSuper,
    getShadow,
  },
};
