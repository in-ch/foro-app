import {gql} from '@apollo/client';

export const LOAD_FOOD = gql`
  query loadFood($userNo: Float!) {
    loadFood(userNo: $userNo) {
      no
      name
      category
      categoryColor
      dday
      keyword
      onlyMe
      user
      createdAt
      updatedAt
    }
  }
`;
