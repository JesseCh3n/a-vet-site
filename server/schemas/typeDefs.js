const typeDefs = `

  type Appointment {
    _id: ID
    vet: String
    appointmentDate: String
    appointmentTime: String
    appointmentText: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    appointments: [Appointment]
  }

  type Auth {
    token: ID
    user: User
  }

  type Count {
    count: Int!
  }

  type Query {
    me: User
    users: [User]
    checkUsers(
      appDate: String!,
      appTime: String!
    ): Count
  }


  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addAppointment(
      userId: ID!,
      vetData: String!,
      appDate: String!,
      appTime: String!,
      appText: String!
    ): User
    updateAppointment(
      appointmentId: ID!,
      appointmentText: String!
    ): User
    removeAppointment(appointmentId: ID!): User
  }
`;

module.exports = typeDefs;
