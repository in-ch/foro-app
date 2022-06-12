import {gql} from '@apollo/client';

export const LOAD_USER = gql`
  query loadUser($userNo: Float!) {
    loadUser(userNo: $userNo) {
      nickname
      profile
      alarmNeighborShareRequest
      alarmNeighborFoodSharingNews
    }
  }
`;
