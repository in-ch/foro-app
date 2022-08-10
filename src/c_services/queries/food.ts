import {gql} from '@apollo/client';

export const LOAD_FOOD = gql`
  query loadFood($userNo: Float!) {
    loadFood(userNo: $userNo) {
      no
      name
      category {
        color
        name
      }
      dday
      keyword
      onlyMe
      consumed
      createdAt
      updatedAt
      user {
        no
      }
    }
  }
`;

export const LOAD_FOOD_DATA = gql`
  query loadFoodData($foodNo: Float!) {
    loadFoodData(foodNo: $foodNo) {
      no
      name
      category {
        name
        color
      }
      dday
      keyword
      onlyMe
      memo
      createdAt
      updatedAt
      consumed
      user {
        no
      }
    }
  }
`;
