const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

import { GraphQLScalarType } from 'graphql';

today = new Date();

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
})

const resolvers = {
  Date: dateScalar,
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);

        return user;
      }

      throw AuthenticationError;
    },
    users: async (parent, { id }, context) => {
      if (context.user.isAdmin) {
        const users = await User.findAll();

        usersArr = users.map((user) => user.appointments.filter((a) => a.appointmentDate == today));

        return usersArr;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addAppointment: async (parent, { Appointment }, context) => {
      if (context.user) {

        const user = await User.findByIdAndUpdate(context.user.id, {
          $push: { appointmentData: Appointment },
        });

        return user;
      }

      throw AuthenticationError;
    },

    updateAppointment: async (parent, { userId, appointmentId}, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate({_id: userId, "appointments._id":"appointmentId"}, {
          $set: {'appointments.$.appointmentText': 'appointmentText' },
        });
        return user;
      }
      throw AuthenticationError;
    },

    removeAppointment: async (parent, { userId, appointmentId}, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate({_id: userId, "appointments._id" : "appointmentId"}, {
          $pull: {
            appointments: {
              _id: appointmentId,
            },
          }
        });
        return user;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
