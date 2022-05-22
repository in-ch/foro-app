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
      createdAt
      updatedAt
    }
  }
`;

export const LOAD_FOOD_DATA = gql`
  query loadFoodData($foodNo: Float!) {
    loadFoodData(foodNo: $foodNo) {
      name
      category
      categoryColor
      dday
      keyword
      onlyMe
      createdAt
      updatedAt
    }
  }
`;
