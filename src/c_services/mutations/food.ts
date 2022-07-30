import {gql} from '@apollo/client';

export const INSERT_FOOD = gql`
  mutation insertFood(
    $userNo: Float!
    $food: InsertFoodInput!
    $categoryNo: Float!
  ) {
    insertFood(userNo: $userNo, food: $food, categoryNo: $categoryNo) {
      ok
      error
      isAdd
    }
  }
`;

export const UPDATE_FOOD = gql`
  mutation updateFood($food: UpdateFoodInput!) {
    updateFood(food: $food) {
      ok
      error
    }
  }
`;

export const DELETE_FOOD = gql`
  mutation deleteFood($foodNo: Float!) {
    deleteFood(foodNo: $foodNo) {
      ok
      error
    }
  }
`;

export const SEARCH_FOOD_USER = gql`
  mutation searchFoodUser($userNo: Float!, $keyword: String!) {
    searchFoodUser(userNo: $userNo, keyword: $keyword) {
      no
      name
      createdAt
    }
  }
`;

export const ALTER_FOOD_OWNER = gql`
  mutation alterFoodOwner($userNo: Float!, $foodNo: Float!, $alarmNo: Float!) {
    alterFoodOwner(userNo: $userNo, foodNo: $foodNo, alarmNo: $alarmNo) {
      ok
    }
  }
`;
