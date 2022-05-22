import React, {useEffect, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/ko';

require('moment-timezone');

import Header from './Header';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {getDateListFilter} from '@utills/getListFilter';
import {LOAD_FOOD} from '@services/queries/food';
import {useQuery} from '@apollo/client';
import {textOverflow} from '@utills/textOverflow';
import {FoodData} from '~/types/Food';

const TextContainer = styled.View<TextContainerProps>`
  padding-left: ${nomalizes[3]}px;
  padding-right: ${nomalizes[3]}px;
  padding-bottom: ${nomalizes[1]}px;
  margin-right: ${nomalizes[5]}px;
  background-color: ${props =>
    props.background ? props.background : '#FF6C63'};
  height: ${nomalizes[13]}px;
  margin-bottom: ${nomalizes[2]}px;
  width: 98%;
  min-width: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const TText = styled.Text`
  text-align: left;
  font-size: ${nomalizes[7]}px;
  color: #fff;
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
    props.dis === 'disabled' ? '#b6b6b6' : props.current ? '#fff' : '#303030'};
`;

interface CurrentProps {
  current?: boolean;
}
interface DayTextProps {
  dis?: string | undefined;
  GoToAgenda: () => void;
  current?: boolean;
}
interface TextContainerProps {
  background?: string;
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

  const {data, refetch} = useQuery(LOAD_FOOD, {
    variables: {
      userNo: 1,
    },
  });

  useEffect(() => {
    refetch();
    console.log('리패취');
  }, [refetch]);
  return (
    <>
      <CalendarList
        dayComponent={({date, state}) => {
          const ddata = getDateListFilter(
            data?.loadFood,
            DateToString(date?.year, date?.month, date?.day),
          );
          return (
            <View style={{height: nomalizes[75], marginTop: nomalizes[3]}}>
              <DayContainer
                current={
                  DateToString(date?.year, date?.month, date?.day) ===
                  String(currentDay)
                }>
                <DayText
                  dis={state}
                  current={
                    DateToString(date?.year, date?.month, date?.day) ===
                    String(currentDay)
                  }>
                  {date?.day}
                </DayText>
              </DayContainer>
              <TouchableWithoutFeedback
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
                {state !== 'disabled' &&
                  ddata !== [] &&
                  ddata !== undefined &&
                  ddata[0]?.name !== undefined &&
                  ddata.map((food: FoodData, index: number) => {
                    if (index > 2) {
                      return '';
                    }
                    return (
                      <>
                        <TextContainer background={food?.categoryColor}>
                          <TText>{textOverflow(food?.name)}</TText>
                        </TextContainer>
                      </>
                    );
                  })}
              </TouchableWithoutFeedback>
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
        pastScrollRange={24}
        futureScrollRange={24}
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
      />
    </>
  );
};

export default CCalendar;
