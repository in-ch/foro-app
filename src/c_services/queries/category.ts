import {gql} from '@apollo/client';

export const LOAD_CATEGORY = gql`
  query loadCategory($userNo: Float!) {
    loadCategory(userNo: $userNo) {
      no
      name
      color
      createdAt
    }
  }
`;
