import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String! $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment(
    $userId: ID!,
    $vetData: String!,
    $appDate: String!,
    $appTime: String!,
    $appText: String!
    ) {
    addAppointment(
      userId: $userId,
      vetData: $vetData,
      appDate: $appDate,
      appTime: $appTime,
      appText: $appText
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

export const REMOVE_APPOINTMENT = gql`
  mutation removeAppointment($appointmentId: ID!) {
    removeAppointment(appointmentId: $appointmentId) {
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

export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment(
    $appointmentId: ID!,
    $appointmentText: String!
    ) {
    updateAppointment(
      appointmentId: $appointmentId,
      appointmentText: $appointmentText
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