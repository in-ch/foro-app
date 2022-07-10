/* eslint-disable no-array-constructor */
export const getWeek = day => {
  var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
  var today = new Date(day).getDay();
  var todayLabel = week[today];
  return todayLabel;
};
