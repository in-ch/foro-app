import {gql} from '@apollo/client';

export const LOAD_FRIEND_FOOD = gql`
  query loadFriendFood($userNo: Float!) {
    loadFriendFood(userNo: $userNo) {
      no
      nickname
      profile
      food {
        no
        name
        dday
      }
    }
  }
`;
