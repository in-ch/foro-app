import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableNativeFeedback} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import moment from 'moment';
import styled from 'styled-components/native';

import images from '@assets/images';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {LOAD_FOOD} from '@services/queries/food';
import {useQuery} from '@apollo/client';
import {getDateListFilter} from '@utills/getListFilter';
import {FoodData} from '~/types/Food';

const Heading = styled.Text`
  font-weight: bold;
  font-size: ${nomalizes[12]}px;
  color: rgb(50, 50, 50);
`;
const RenderContainer = styled.View`
  height: ${nomalizes[40]}px;
  margin-top: ${nomalizes[5]}px;
`;
const RenderFlexOne = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${nomalizes[10]}px;
  height: ${nomalizes[20]}px;
  align-items: center;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;
const FruitText = styled.Text`
  margin-left: ${nomalizes[5]}px;
  font-size: ${nomalizes[12]}px;
  color: RGB(50, 50, 50);
`;
const ConsumeDone = styled.View`
  width: ${nomalizes[26]}px;
  height: ${nomalizes[10]}px;
  border-radius: ${nomalizes[2]}px;
  margin-right: ${nomalizes[5]}px;
  background-color: #ffd9d7;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const ConsumeDoneText = styled.Text`
  font-size: ${nomalizes[5]}px;
  color: #ff6c63;
`;
const ConsumeDoneDate = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #a8a8a8;
`;
const Mark = styled.View<MarkProps>`
  width: ${nomalizes[8]}px;
  height: ${nomalizes[8]}px;
  border-radius: ${nomalizes[2]}px;
  background-color: ${props =>
    props.background ? props.background : '#637cff'};
`;
const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0);
  padding: ${nomalizes[30]}px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ModalButton = styled.TouchableOpacity`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
  border-radius: ${nomalizes[20]}px;
  display: flex;
  background-color: #ff6c63;
  ${cssUtil.doubleCenter};
`;

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
    TIMELINE_CALENDAR: 'timeline_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};

interface Props {
  items?: FoodData;
  selected?: string;
  goToDetail: () => void;
  GoToFoodAdd: () => void;
}
interface MarkProps {
  background: string;
}
const AgendaScreen = ({items, selected, goToDetail, GoToFoodAdd}: Props) => {
  const {data} = useQuery(LOAD_FOOD, {
    variables: {
      userNo: 1,
    },
  });
  const [selectedValue] = useState(
    selected ? selected : String(moment(new Date()).format('YYYY-MM-DD')),
  );
  const [iitems, setIitems] = useState<AgendaSchedule | undefined>(items);
  const loadItems = (day: DateData) => {
    const itemsValue = iitems || {};
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        const ddata = getDateListFilter(data?.loadFood, strTime);
        if (!itemsValue[strTime]) {
          itemsValue[strTime] = [];
          for (let j = 0; j < ddata?.length; j++) {
            itemsValue[strTime].push({
              name: ddata[j]?.name,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
              category: ddata[j].category,
              categoryColor: ddata[j].categoryColor,
              createdAt: ddata[j].createdAt,
              dday: ddata[j].dday,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(itemsValue).forEach(key => {
        newItems[key] = itemsValue[key];
      });
      setIitems(newItems);
    }, 1000);
  };

  const renderItem = (item: {
    name: React.ReactNode;
    categoryColor: any;
    category: React.ReactNode;
    dday: string;
    createdAt: string;
  }) => {
    return (
      <View testID={testIDs.agenda.ITEM} style={[styles.item]}>
        <TouchableNativeFeedback onPress={goToDetail}>
          <Heading>{item?.name}</Heading>
        </TouchableNativeFeedback>
        <RenderContainer>
          <RenderFlexOne>
            <TouchableNativeFeedback onPress={goToDetail}>
              <Row>
                <Mark background={item?.categoryColor} />
                <FruitText>{item?.category}</FruitText>
              </Row>
            </TouchableNativeFeedback>
            <Row>
              <ConsumeDone>
                <ConsumeDoneText>소비 완료</ConsumeDoneText>
              </ConsumeDone>
              <Image
                style={{
                  width: nomalizes[10],
                  height: nomalizes[10],
                }}
                source={images.setting}
              />
            </Row>
          </RenderFlexOne>
          <RenderFlexOne>
            <ConsumeDoneDate>
              {moment(new Date(item?.createdAt)).format('YYYY-MM-DD')} ~{' '}
              {item?.dday}
            </ConsumeDoneDate>
            <ConsumeDoneDate>비공개</ConsumeDoneDate>
          </RenderFlexOne>
        </RenderContainer>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return <View style={styles.emptyDate} />;
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={iitems}
        loadItemsForMonth={loadItems}
        selected={selectedValue}
        renderItem={(item: any) => renderItem(item)}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        theme={{
          agendaDayNumColor: '#000',
          agendaTodayColor: '#FF6C63',
          agendaKnobColor: '#e4e4e4',
          dotColor: '#FF 6C63',
          selectedDayBackgroundColor: '#FF6C63',
        }}
      />
      <ModalBackground>
        <ModalButton onPress={GoToFoodAdd}>
          <Image
            style={{
              width: nomalizes[18],
              height: nomalizes[18],
            }}
            source={images.plusWhite}
          />
        </ModalButton>
      </ModalBackground>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    padding: 20,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default AgendaScreen;
