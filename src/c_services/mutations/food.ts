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
