import {gql} from '@apollo/client';

export const INSERT_CATEGORY = gql`
  mutation insertCategory($userNo: Float!, $category: InsertCategoryInput!) {
    insertCategory(userNo: $userNo, category: $category) {
      no
      name
      color
      createdAt
    }
  }
`;
