/* eslint-disable prettier/prettier */
import {gql} from '@apollo/client';

export const SCHEDULE_PUSH = gql`
  mutation schedulePush(
    $time: String!,
    $userNo: Float!,
    $foodName: String!,
    $type: Float!,
  ) {
    schedulePush(
      time: $time,
      userNo: $userNo,
      foodName: $foodName,
      type: $type,
    ) {
      ok
    }
  }
`;
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

export const TOTAL_SHARE_FOOD = gql`
  mutation totalShareFood($foodNo: Float!, $users: String!, $userNo: Float!) {
    totalShareFood(foodNo: $foodNo, users: $users, userNo: $userNo) {
      ok
    }
  }
`;

export const REQUEST_FOOD = gql`
  mutation requestFood($userNo: Float!, $foodNo: Float!, $friendNo: Float!) {
    requestFood(userNo: $userNo, foodNo: $foodNo, friendNo: $friendNo) {
      ok
    }
  }
`;

export const SHARE_FOOD = gql`
  mutation shareFood($foodNo: Float!, $userNo: Float!) {
    shareFood(foodNo: $foodNo, userNo: $userNo) {
      ok
      no
    }
  }
`;
