const typeDefs = `
  scalar Date

  type MyType {
    created: Date
  }

  input Appointment {
    _id: ID
    vet: String
    appointmentDate: Date
    appointmentTime: String
    appointmentText: String

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Appointment]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  type Query {
    users: [User]
  }


  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addAppointment(
      userId: ID!
      appointmentData: Appointment!
    ): User
    updateAppointment(
      userId: ID!
      appointmentText: String!
    ): User
    removeAppointment(userId: ID!): User
  }
`;

module.exports = typeDefs;
