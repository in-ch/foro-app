import {gql} from '@apollo/client';

export const REQUEST_ADD_FRIEND = gql`
  mutation requestAddFriend($userNo: Float!, $friendNo: Float!) {
    requestAddFriend(userNo: $userNo, friendNo: $friendNo) {
      ok
    }
  }
`;

export const READ_ALL_ALARM = gql`
  mutation allReadAlarm($userNo: Float!) {
    allReadAlarm(userNo: $userNo) {
      ok
    }
  }
`;
