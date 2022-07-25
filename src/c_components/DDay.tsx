import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components/native';
import {nomalizes} from '~/utills/constants';

const Time = styled.Text`
  color: #a4a4a4;
  font-size: ${nomalizes[10]}px;
  margin-top: ${nomalizes[5]};
  font-family: 'Pretendard';
`;
require('moment-timezone');

interface Props {
  time: string;
}
const DDay = ({time}: Props) => {
  return (
    <>
      {Math.abs(moment(time).diff(moment().format(), 'years')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'years'))} 년 전
        </Time>
      ) : Math.abs(moment(time).diff(moment().format(), 'months')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'months'))} 달 전
        </Time>
      ) : Math.abs(moment(time).diff(moment().format(), 'weeks')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'weeks'))} 주 전
        </Time>
      ) : Math.abs(moment(time).diff(moment().format(), 'days')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'days'))} 일 전
        </Time>
      ) : Math.abs(moment(time).diff(moment().format(), 'hours')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'hours'))} 시간 전
        </Time>
      ) : Math.abs(moment(time).diff(moment().format(), 'minutes')) !== 0 ? (
        <Time>
          {Math.abs(moment(time).diff(moment().format(), 'minutes'))} 분 전
        </Time>
      ) : (
        <Time>방금</Time>
      )}
    </>
  );
};

export default DDay;
