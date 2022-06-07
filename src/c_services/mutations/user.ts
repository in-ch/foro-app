import {gql} from '@apollo/client';

export const LOAD_USER_WITH_TOKEN = gql`
  mutation loadUserWithToken($id: String!, $type: String!) {
    loadUserWithToken(id: $id, type: $type) {
      ok
      error
      new
    }
  }
`;

export const INSERT_USER = gql`
  mutation insertUser($user: InsertUserInput!) {
    insertUser(user: $user) {
      ok
      isAdd
      error
    }
  }
`;

export const LOGIN = gql`
  mutation login($token: String!, $type: String!) {
    login(token: $token, type: $type) {
      ok
      token
    }
  }
`;
