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
