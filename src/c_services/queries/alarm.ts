import {gql} from '@apollo/client';

export const LOAD_ALARM = gql`
  query loadAlarm($userNo: Float!) {
    loadAlarm(userNo: $userNo) {
      no
      type
      createdAt
      isRead
      fromUser {
        nickname
        no
      }
      food {
        no
        name
      }
    }
  }
`;

export const LOAD_ALARM_NOT = gql`
  query loadAlarmNotRead($userNo: Float!) {
    loadAlarmNotRead(userNo: $userNo) {
      no
      type
      createdAt
      isRead
    }
  }
`;
