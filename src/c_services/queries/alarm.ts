import {gql} from '@apollo/client';

export const LOAD_ALARM = gql`
  query loadAlarm($userNo: Float!) {
    loadAlarm(userNo: $userNo) {
      type
      createdAt
      fromUser {
        nickname
        no
      }
    }
  }
`;
