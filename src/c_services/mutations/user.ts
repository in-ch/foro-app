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
  mutation login($id: String!, $type: String!) {
    login(id: $id, type: $type) {
      ok
      token
      profile
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!, $userNo: Float!) {
    updateUser(user: $user, userNo: $userNo) {
      ok
      error
    }
  }
`;

export const DEUPLICATENICKNAME = gql`
  mutation duplicateNickname($nickname: String!) {
    duplicateNickname(nickname: $nickname) {
      no
    }
  }
`;

export const LOAD_USER_BY_NAME = gql`
  mutation loadUserByName($nickname: String!) {
    loadUserByName(nickname: $nickname) {
      no
      nickname
      createdAt
      profile
    }
  }
`;
