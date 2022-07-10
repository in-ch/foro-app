export const thisWeek = () => {
  var value = [];

  // 오늘의 요일 및 날짜
  var currentDay = new Date();
  var theYear = currentDay.getFullYear();
  var theMonth = Number(currentDay.getMonth()) + 1;
  var theDate = Number(currentDay.getDate());
  var theDay = Number(currentDay.getDay());

  // 날짜 업데이트
  var newYear, newMonth, newDate;

  // 이번달 마지막날
  var nowLast = new Date();
  nowLast.setMonth(nowLast.getMonth() + 1);
  var nowLastDay = new Date(nowLast.getYear(), nowLast.getMonth(), '');
  nowLastDay = nowLastDay.getDate();

  var lastDay; // 이전 달 마지막날 파악

  for (var i = -theDay; i < (theDay - 7) * -1; i++) {
    newYear = theYear;
    newDate = theDate;
    newMonth = theMonth;

    //첫주 일때
    if (theDate + i < 1) {
      if (theMonth == 1) {
        // 1월 첫째주 일때
        lastDay = new Date(
          Number(currentDay.getFullYear()) - 1,
          Number(currentDay.getMonth()) + 12,
          '',
        );
      } else {
        // 1월 첫째주가 아닐때
        lastDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), '');
      }

      newYear = lastDay.getFullYear();
      newMonth = lastDay.getMonth();
      newDate = Number(lastDay.getDate()) + i;

      //마지막주 일때
    } else if (theDate + i > nowLastDay) {
      if (theMonth == 12) {
        // 12월 마지막주 일때
        newYear = Number(theYear) + 1;
      }

      newMonth = Number(theMonth) + 1;
      newDate = i;
    }

    newDate = newDate + i;

    // yyyy-mm-dd 형식으로
    if (String(newDate).length < 2) {
      newDate = '0' + String(newDate);
    }
    if (String(newMonth).length < 2) {
      newMonth = '0' + String(newMonth);
    }

    //이번주 7일의 날짜를 value에 담는다.
    value.push(newYear + '-' + newMonth + '-' + newDate);
  }
  return value;
};
