export const processColors = [
  '#00e7ac',
  '#00cdc8',
  '#00b4e3',
  '#009CFF',
  '#5176ff',
  '#a151ff',
  '#f22dff',
  '#f63cd5',
  '#fb4bab',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
  '#ff5a81',
];

export enum ThemeEnum {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

interface ToggleThemeProp {
  _type?: ThemeEnum;
  isTry?: boolean; // 다크모드 체험일 땐 async 저장 안하기 위함
}
export interface ThemeProp {
  theme: Theme;
  themeType: ThemeEnum;
  isDark: boolean;
  toggleTheme: (prop?: ToggleThemeProp) => void;
}

export interface CommonColor {
  mint: string;
  purple: string;
  blue: string;
  pink: string;
  yellow: string;
  grey: string;
  darkdarkGrey: string;
  black: string;
  commonDark: string;
  commonLight: string;
  commonLightGrey: string;
  commonDarkGrey: string;
  deactProgressColor: string;
  calendarArrowColor: string;
  statIndicatorColor: string;
  kakaoYellowColor: string;
  kakaoBrownColor: string;
  appleColor: string;
  googleColor: string;
  processColors: string[];
  placeholderColor: string;

  commonGreyLevel2Dark: string;

  // 0826 grey key color 재재정의
  commonGreyLevel1: string;
  commonGreyLevel2: string;
  commonGreyLevel3: string;
  commonGreyLevel4: string;

  /* 정식버전 */
  lightBlue: string;
  middleBlue: string;
  exceptDarkPurple: string; // XD 컬러에는 없는데, Text에 대해서 가끔 이걸 씀
  cmDark: string;
  darkPurple: string;
  middlePurple: string;
  lightPurple: string;
  middleBlueLoading: string;

  /* 21.05~ 피그마 컬러 */
  pigma: {
    pink: string;
    blue: string;
    grey: string;
    light: string[];
    dark: string[];
    palette: string[];
  };
}

export interface Theme extends CommonColor {
  main: string;
  sub: string;
  chGrey: string; // 변화적인 grey
  chLightGrey: string;
  lightGrey: string;
  darkGrey: string;
  chGreyText: string;

  // 0731 grey key color 재정의
  containerBg: string;
  chDarkGrey: string;
  greyLevel1: string;
  greyLevel2: string;
  reverseGreyLevel2: string;

  // 0826 grey key color 재재정의
  greyMainBox: string;
  percentLabel: string;
  meLabel: string;
  volumeMaximumTrackTintColorForAddR: string;
  volumeMaximumTrackTintColorForAddRModal: string;
  floatingNfcText: string;
  bottomBtnBg: string;
  allCategoryBg: string; // 루틴 추천 '전체' 카테고리

  /* 정식버전 */
  routineAdLoading: string; // 홈화면 과거 루틴 성공 - 광고 불러올 때
  energy: {
    menuOptionDivision: string;
  };
  cardShadow: string;
  floatingShadow: string;

  white_cmDark: string; // 이제 직관적으로 기본/다크에 나타나는 색깔로 표시하자. 기본모드색_다크모드색
  cmDark_white: string;
  lightBlue_middlePurple: string;
  commonDark_commonLight: string; // = sub, 이제 이걸로 쓰자
  middlePurple_white: string;
  exceptDarkPurple_white: string;
  white_darkPurple: string;
  middlePurple_lightBlue: string;
  exceptDarkPurple_middleBlue: string;
  middleBlue_middlePurple: string;
  middleBlue_darkPurple: string;
  middleBlueLoading_darkPurple: string;
  darkPurple_white: string;
  middlePurple_commonGreyLevel2: string;
  middleBlue_cmDark: string;
  cmDark_middleBlue: string;
  commonDark_white: string;
  darkPurple_commonGreyLevel2: string;
  commonGreyLevel3_commonGreyLevel2: string;
  lightBlue_white: string;
  white_middlePurple: string;
  lightBlue_darkPurple: string;
  commonGreyLevel3_commonGreyLevel1: string;
  middlePurple_middleBlue: string;
  middlePurple_darkPurple: string;
  commonLight_darkPurple: string;
  middleBlue_commonLight: string;
  middleBlueLoading_white: string;
  commonGreyLevel3_white: string;
  darkPurple_lightBlue: string;
  middleBlueLoading_middlePurple: string;
  darkPurple_middlePurple: string;
  middleBlue_exceptDarkPurple: string;
  lightBlue_middleBlue: string;
  lightBlue_exceptDarkPurple: string;
  lightBlue_cmDark: string;
  darkPurple_middleBlue: string;
  middleBlue_white: string;

  // textInput focused color
  focusedTextInputColor: string;

  // pigma
  pigmaMain: string[];
  pigmaMainReversed: string[];
  pigmaText: string; // 텍스트 색깔
  pigmaScreen: string; // 배경색
  pigma_1_2: string;
  pigma_1_3: string; // light모드: light[1], dark모드: dark[3]
  pigma_3_1: string;
  pigma_3_2: string;
  pigma_2_3: string;
  pigma_2_1: string;
  pigma_white_1: string;
  pigma_white_2: string;
  pigma_white_3: string;
  pigma_4_5: string;
}

type RGBType = {r: number; g: number; b: number} | null;
const hexToRgb = (hex: string): RGBType => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || [''];
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return result
    ? {
        r,
        g,
        b,
      }
    : null;
};
const convertHexNOpacityToRgb = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return hex;
  }
  const {r, g, b} = rgb;
  const fullRgb = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return fullRgb;
};
export const themeUtil = {
  hexToRgb,
  convertHexNOpacityToRgb,
};

export const commonColor: CommonColor = {
  mint: '#02E3AF',
  purple: '#f22dff',
  blue: '#009CFF',
  pink: '#ff5a81',
  yellow: '#FFC266',
  grey: '#c4c3c9', // TODO: 물어보기
  darkdarkGrey: '#6b6778',
  black: 'black',
  commonDark: '#292444',
  commonLight: '#FFFFFF',
  commonLightGrey: 'rgb(228, 231, 232)',
  commonDarkGrey: 'rgb(55, 50, 75)',
  deactProgressColor: '#D0D0D0',
  calendarArrowColor: '#B5B5B6',
  statIndicatorColor: '#2A2345',
  kakaoYellowColor: '#f9dd34',
  kakaoBrownColor: '#371e20',
  appleColor: '#141414',
  googleColor: '#3a79ed',
  processColors,
  placeholderColor: '#d1d3d6',

  commonGreyLevel2Dark: '#868696',

  // 0826 grey key color 재재정의
  commonGreyLevel1: '#EBECEB',
  commonGreyLevel2: '#D8DADB',
  commonGreyLevel3: '#868696',
  commonGreyLevel4: '#696979',

  /* 정식버전 */
  lightBlue: '#E8EEFC',
  middleBlue: '#d1defc',
  middleBlueLoading: '#bbcffc', // 로딩을 위한 middleBlue. 그냥 middleBlue 쓰면 너무 옅어서

  // dark 계열
  exceptDarkPurple: '#2E2249',
  cmDark: '#2c2347', // new commonDark, common은 cm으로 줄여쓴다!
  // darkPurple: '#372F63', // deprecated. 이제 이 색깔 피그마에 없음.
  darkPurple: '#41367D', // = dark[2]
  middlePurple: '#514593',
  lightPurple: '#A19FFF',

  // pigma
  pigma: {
    pink: '#ff5a81',
    blue: '#009CFF',
    grey: '#868696',
    light: [
      'transparent',
      '#E8EEFC',
      '#DAE4FC',
      '#D1DEFC',
      '#868696',
      '#A7A1C8',
    ],
    dark: [
      'transparent',
      '#514593',
      '#41367D',
      '#282154',
      '#BEBEBE',
      '#9D9AC7',
    ],
    palette: [
      'transparent',
      '#FD8DB4',
      '#FF8296',
      '#FF9A99',
      '#FFAB94',
      '#FFD48E',
      '#67E7CD',
      '#48D3E8',
      '#5CABFF',
      '#4F87FF',
      '#787EFF',
      '#B4ADFF',
    ],
  },
};

export const darkTheme: Theme = {
  ...commonColor,
  main: commonColor.commonDark,
  sub: commonColor.commonLight,
  chGrey: 'rgb(90, 87, 108)',
  lightGrey: 'rgb(94, 94, 109)',
  chLightGrey: 'rgb(94, 94, 109)',
  darkGrey: 'rgb(94, 94, 109)',

  chGreyText: 'rgb(180, 180, 188)',

  // 0731 grey key color 재정의
  containerBg: commonColor.commonGreyLevel4,
  chDarkGrey: 'rgb(228, 231, 232)',
  greyLevel1: commonColor.commonGreyLevel4,
  greyLevel2: commonColor.commonGreyLevel2Dark,
  reverseGreyLevel2: commonColor.commonGreyLevel2,

  // 0826 grey key color 재재정의
  greyMainBox: commonColor.commonGreyLevel4,
  percentLabel: commonColor.commonDark,
  meLabel: commonColor.commonGreyLevel4,
  volumeMaximumTrackTintColorForAddR: commonColor.commonGreyLevel3,
  volumeMaximumTrackTintColorForAddRModal: commonColor.commonGreyLevel4,
  floatingNfcText: commonColor.commonGreyLevel2Dark,
  bottomBtnBg: '#696979',
  allCategoryBg: commonColor.commonGreyLevel4,

  /* 정식버전 */
  routineAdLoading: commonColor.commonLight, // FIXME
  energy: {
    menuOptionDivision: '#e6e6e6',
  },
  cardShadow: '#302957',
  floatingShadow: '#000000',

  white_cmDark: commonColor.cmDark,
  cmDark_white: commonColor.commonLight,
  exceptDarkPurple_white: commonColor.commonLight,
  lightBlue_middlePurple: commonColor.middlePurple,
  commonDark_commonLight: commonColor.commonLight,
  middlePurple_white: commonColor.commonLight,
  white_darkPurple: commonColor.darkPurple,
  middlePurple_lightBlue: commonColor.lightBlue,
  exceptDarkPurple_middleBlue: commonColor.middleBlue,
  middleBlue_middlePurple: commonColor.middlePurple,
  middleBlue_darkPurple: commonColor.darkPurple,
  middleBlueLoading_darkPurple: commonColor.darkPurple,
  darkPurple_white: commonColor.commonLight,
  middlePurple_commonGreyLevel2: commonColor.commonGreyLevel2,
  middleBlue_cmDark: commonColor.cmDark,
  cmDark_middleBlue: commonColor.middleBlue,
  commonDark_white: commonColor.commonLight,
  darkPurple_commonGreyLevel2: commonColor.commonGreyLevel2,
  commonGreyLevel3_commonGreyLevel2: commonColor.commonGreyLevel2,
  lightBlue_white: commonColor.commonLight,
  white_middlePurple: commonColor.middlePurple,
  lightBlue_darkPurple: commonColor.darkPurple,
  commonGreyLevel3_commonGreyLevel1: commonColor.commonGreyLevel3,
  middlePurple_middleBlue: commonColor.middleBlue,
  middlePurple_darkPurple: commonColor.darkPurple,
  commonLight_darkPurple: commonColor.darkPurple,
  middleBlue_commonLight: commonColor.commonLight,
  middleBlueLoading_white: commonColor.commonLight,
  commonGreyLevel3_white: commonColor.commonLight,
  darkPurple_lightBlue: commonColor.lightBlue,
  middleBlueLoading_middlePurple: commonColor.middlePurple,
  darkPurple_middlePurple: commonColor.middlePurple,
  middleBlue_exceptDarkPurple: commonColor.exceptDarkPurple,
  lightBlue_middleBlue: commonColor.middleBlue,
  lightBlue_exceptDarkPurple: commonColor.exceptDarkPurple,
  lightBlue_cmDark: commonColor.exceptDarkPurple,
  darkPurple_middleBlue: commonColor.middleBlue,
  middleBlue_white: commonColor.commonLight,

  // textInput focused color
  focusedTextInputColor: '#a69fcc',

  // pigma
  pigmaMain: commonColor.pigma.dark,
  pigmaMainReversed: commonColor.pigma.light,
  pigmaText: '#FFFFFF',
  pigmaScreen: commonColor.pigma.dark[2],
  pigma_1_2: commonColor.pigma.dark[2],
  pigma_1_3: commonColor.pigma.dark[3],
  pigma_3_1: commonColor.pigma.dark[1],
  pigma_3_2: commonColor.pigma.dark[2],
  pigma_2_3: commonColor.pigma.dark[3],
  pigma_2_1: commonColor.pigma.dark[1],
  pigma_white_1: commonColor.pigma.dark[1],
  pigma_white_2: commonColor.pigma.dark[2],
  pigma_white_3: commonColor.pigma.dark[3],
  pigma_4_5: commonColor.pigma.dark[5],
};

export const lightTheme: Theme = {
  ...commonColor,
  main: commonColor.commonLight,
  // sub: commonColor.commonDark,
  sub: commonColor.darkPurple, // 이걸로 바꾸자! 너무 legacy가 많아서
  chGrey: 'rgb(209, 211, 214)',
  lightGrey: 'rgb(228, 231, 232)', // TODO: lightGrey -> chLightGrey
  chLightGrey: 'rgb(228, 231, 232)',
  darkGrey: 'rgb(123, 122, 138)',

  chGreyText: 'rgb(129, 127, 144)',

  // 0731 grey key color 재정의
  containerBg: commonColor.commonLight,
  chDarkGrey: 'rgb(94, 94, 109)',
  greyLevel1: '#EBECEB',
  greyLevel2: '#D8DADB',
  reverseGreyLevel2: commonColor.commonGreyLevel2Dark,

  // 0826 grey key color 재재정의
  greyMainBox: commonColor.commonGreyLevel2,
  percentLabel: commonColor.commonLight,
  meLabel: commonColor.commonGreyLevel2,
  volumeMaximumTrackTintColorForAddR: commonColor.commonGreyLevel2,
  volumeMaximumTrackTintColorForAddRModal: commonColor.commonGreyLevel2,
  floatingNfcText: commonColor.commonLight,
  bottomBtnBg: '#D8DADB',
  allCategoryBg: commonColor.commonGreyLevel3,

  /* 정식버전 */
  routineAdLoading: commonColor.lightBlue,
  energy: {
    menuOptionDivision: '#ededed',
  },
  cardShadow: '#e8e8e8',
  floatingShadow: '#a8a8a8',

  white_cmDark: commonColor.commonLight,
  cmDark_white: commonColor.cmDark,
  exceptDarkPurple_white: commonColor.exceptDarkPurple,
  lightBlue_middlePurple: commonColor.lightBlue,
  commonDark_commonLight: commonColor.commonDark,
  middlePurple_white: commonColor.middlePurple,
  white_darkPurple: commonColor.commonLight,
  middlePurple_lightBlue: commonColor.middlePurple,
  exceptDarkPurple_middleBlue: commonColor.exceptDarkPurple,
  middleBlue_middlePurple: commonColor.middleBlue,
  middleBlue_darkPurple: commonColor.middleBlue,
  middleBlueLoading_darkPurple: commonColor.middleBlueLoading,
  darkPurple_white: commonColor.darkPurple,
  middlePurple_commonGreyLevel2: commonColor.middlePurple,
  middleBlue_cmDark: commonColor.middleBlue,
  cmDark_middleBlue: commonColor.cmDark,
  commonDark_white: commonColor.commonDark,
  darkPurple_commonGreyLevel2: commonColor.darkPurple,
  commonGreyLevel3_commonGreyLevel2: commonColor.commonGreyLevel3,
  lightBlue_white: commonColor.lightBlue,
  white_middlePurple: commonColor.commonLight,
  lightBlue_darkPurple: commonColor.lightBlue,
  commonGreyLevel3_commonGreyLevel1: commonColor.commonGreyLevel3,
  middlePurple_middleBlue: commonColor.middlePurple,
  middlePurple_darkPurple: commonColor.middlePurple,
  commonLight_darkPurple: commonColor.commonLight,
  middleBlue_commonLight: commonColor.middleBlue,
  middleBlueLoading_white: commonColor.middleBlueLoading,
  commonGreyLevel3_white: commonColor.commonGreyLevel3,
  darkPurple_lightBlue: commonColor.darkPurple,
  middleBlueLoading_middlePurple: commonColor.middleBlueLoading,
  darkPurple_middlePurple: commonColor.darkPurple,
  middleBlue_exceptDarkPurple: commonColor.middleBlue,
  lightBlue_middleBlue: commonColor.lightBlue,
  lightBlue_exceptDarkPurple: commonColor.lightBlue,
  lightBlue_cmDark: commonColor.lightBlue,
  darkPurple_middleBlue: commonColor.darkPurple,
  middleBlue_white: commonColor.middleBlue,

  // textInput focused color
  focusedTextInputColor: '#5e5496',

  // pigma
  pigmaMain: commonColor.pigma.light,
  pigmaMainReversed: commonColor.pigma.dark,
  pigmaText: commonColor.pigma.dark[3],
  pigmaScreen: '#FFFFFF',
  pigma_1_2: commonColor.pigma.light[1],
  pigma_1_3: commonColor.pigma.light[1],
  pigma_3_1: commonColor.pigma.light[3],
  pigma_3_2: commonColor.pigma.light[3],
  pigma_2_3: commonColor.pigma.light[2],
  pigma_2_1: commonColor.pigma.light[2],
  pigma_white_1: commonColor.commonLight,
  pigma_white_2: commonColor.commonLight,
  pigma_white_3: commonColor.commonLight,
  pigma_4_5: commonColor.pigma.light[4],
};

export const THEMECOLOR = '#8067ff';
export const THEMECOLOR_DART = '#5d5877';
export const THEMECOLOR_LIGHT = '#b3a4ff';
export const THEMECOLOR_LIGHT_SUPER = '#e1def2';
// 다크모드 메인시트 #696978
// 기본모드 메인시트 #D9DBDC
// 엑스트라 텍스트 컬러 #878796
