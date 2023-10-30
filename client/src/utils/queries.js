import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      appointments {
        _id
        vet
        appointmentDate
        appointmentTime
        appointmentText
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers(
    $today: String!
  ) {
    getUsers(
      today: $today
    ) {
      _id
      firstName
      lastName
      appointments {
        _id
        vet
        appointmentDate
        appointmentTime
        appointmentText
      }
    }
  }
`;

export const QUERY_CHECK_USER = gql`
  query checkUsers(
    $appDate: String!,
    $appTime: String!
    ) {
    checkUsers(
      appDate: $appDate,
      appTime: $appTime
      ) {
      count
      }
    }
`;

