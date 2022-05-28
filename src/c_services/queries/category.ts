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

export const LOAD_CATEGORY_DATA = gql`
  query loadCategoryData($categoryNo: Float!) {
    loadCategoryData(categoryNo: $categoryNo) {
      no
      name
      color
    }
  }
`;
