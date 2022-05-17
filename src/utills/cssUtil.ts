import {css} from 'styled-components';

const doubleCenterCss = css`
  justify-content: center;
  align-items: center;
`;
const alignSelfCenterCss = css`
  align-self: center;
`;
const bgCss = css`
  background-color: ${({bg}: {bg: string}) => bg || 'transparent'};
`;
const fontColor = css`
  font-family: 'NotoSansKR-Regular';
`;
export const cssUtil = {
  doubleCenter: doubleCenterCss,
  alignSelfCenter: alignSelfCenterCss,
  bg: bgCss,
  fontColor: fontColor,
};
