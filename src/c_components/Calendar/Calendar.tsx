import React, {useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/ko';

require('moment-timezone');

import Header from './Header';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const TextContainer = styled.View`
  padding-left: ${nomalizes[2]}px;
  padding-bottom: ${nomalizes[1]}px;
  margin-bottom: ${nomalizes[2]}px;
  margin-right: ${nomalizes[5]}px;
  background-color: #5f5bff;
  display: flex;
`;
const DayContainer = styled.View<CurrentProps>`
  width: ${nomalizes[20]}px;
  height: ${nomalizes[20]}px;
  padding-top: ${nomalizes[1]}px;
  padding-bottom: ${nomalizes[1]}px;
  border-radius: ${nomalizes[4]}px;
  display: flex;
  background-color: ${props => (props.current ? '#FF6C63' : '')};
  ${cssUtil.doubleCenter};
`;
const DayText = styled.Text<DayTextProps>`
  color: ${props =>
    props.dis === 'disabled' ? '#cacaca' : props.current ? '#fff' : '#303030'};
`;
const TText = styled.Text`
  text-align: left;
  font-size: ${nomalizes[8]}px;
  color: rgb(50, 50, 50);
`;

interface CurrentProps {
  current?: boolean;
}
interface DayTextProps {
  dis?: string;
  GoToAgenda: () => void;
  current?: boolean;
}
interface Props {
  GoToAgenda: () => void;
  GoToDetail: (value: string) => void;
}
const DateToString = (
  year: number | undefined,
  month: number | undefined,
  day: number | undefined,
) => {
  return `${year}-${String(month)?.length > 1 ? '' : '0'}${month}-${
    String(day)?.length > 1 ? '' : '0'
  }${day}`;
};
const CCalendar = ({GoToAgenda, GoToDetail}: Props) => {
  const [current, setCurrent] = useState(
    String(moment(new Date()).format('YYYY-MM')),
  ); // month를 바꾸기 위한 값
  const [currentDay] = useState(
    String(moment(new Date()).format('YYYY-MM-DD')),
  ); // today를 고정시키기 위한 값.
  return (
    <>
      <CalendarList
        dayComponent={({date, state}) => {
          console.log(DateToString(date?.year, date?.month, date?.day));
          return (
            <View style={{height: nomalizes[75], marginTop: nomalizes[3]}}>
              <DayContainer
                current={
                  DateToString(date?.year, date?.month, date?.day) ===
                  String(currentDay)
                }>
                <DayText
                  dis={Boolean(state)}
                  current={
                    DateToString(date?.year, date?.month, date?.day) ===
                    String(currentDay)
                  }>
                  {date?.day}
                </DayText>
              </DayContainer>
              {state !== 'disabled' && (
                <TouchableOpacity
                  onPress={() =>
                    GoToDetail(
                      `${date?.year}-${
                        String(date?.month)?.length > 1 ? '' : '0'
                      }${date?.month}-${
                        String(date?.day)?.length > 1 ? '' : '0'
                      }${date?.day}`,
                    )
                  }>
                  <SizedBox.Custom margin={nomalizes[5]} />
                  <TextContainer>
                    <TText>파인애플</TText>
                  </TextContainer>
                  <TextContainer>
                    <TText>토마토</TText>
                  </TextContainer>
                  <TextContainer>
                    <TText>토마토</TText>
                  </TextContainer>
                  <SizedBox.Custom margin={nomalizes[5]} />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        theme={{
          'stylesheet.calendar.main': {
            dayContainer: {
              borderColor: '#D1D3D4',
              borderTopWidth: 1,
              flex: 1,
              height: nomalizes[75],
            },
            week: {
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
          'stylesheet.calendar.header': {
            dayTextAtIndex6: {
              color: 'red',
            },
          },
        }}
        current={current}
        key={current}
        minDate={'2015-01-01'}
        maxDate={'2030-12-31'}
        monthFormat={'yyyy MM'}
        disableMonthChange={false}
        hideExtraDays={false}
        firstDay={0}
        hideDayNames={false}
        showWeekNumbers={false}
        hideArrows={true}
        disableArrowLeft={true}
        disableArrowRight={true}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={false}
        horizontal={true}
        pagingEnabled={true}
        pastScrollRange={50}
        futureScrollRange={50}
        renderHeader={date => {
          return (
            <>
              <Header
                date={date}
                GoToAgenda={GoToAgenda}
                setCurrent={setCurrent}
              />
            </>
          );
        }}
        // Enable the option to swipe between months. Default = false
      />
    </>
  );
};

export default CCalendar;
