import {gql} from '@apollo/client';

export const LOAD_USER_WITH_TOKEN = gql`
  mutation loadUserWithToken($token: String!, $type: String!) {
    loadUserWithToken(token: $token, type: $type) {
      no
      nickname
      profile
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
