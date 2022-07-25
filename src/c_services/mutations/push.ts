import {gql} from '@apollo/client';

export const SEND_PUSH = gql`
  mutation sendPush(
    $userNo: Float!
    $title: String!
    $body: String!
    $type: Float!
  ) {
    sendPush(userNo: $userNo, title: $title, body: $body, type: $type) {
      ok
      error
    }
  }
`;
