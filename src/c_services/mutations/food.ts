import {gql} from '@apollo/client';

export const INSERT_FOOD = gql`
  mutation insertFood($userNo: Float!, $food: InsertFoodInput!) {
    insertFood(userNo: $userNo, food: $food) {
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
