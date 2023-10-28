const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        const user = await User.findById(context.user._id);

        return user;
      }

      throw AuthenticationError;
    },
    users: async (parent, {today}, context) => {
      if (context.user) {
        const users = await User.find({'appointments.appointmentDate' : today});

        return users;
      }

      throw AuthenticationError;
    },
    checkUsers: async (parent, {appDate, appTime}, context) => {
      // if (context.user) {
        const count = await User.countDocuments({'appointments.appointmentDate' : appDate, 'appointments.appointmentTime' : appTime });

        return {count};
      // }

      // throw AuthenticationError;
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
      console.log(user);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addAppointment: async (parent, {userId, vetData, appDate, appTime, appText }, context) => {
      // if (context.user) {

        const user = await User.findOneAndUpdate(
          {_id: userId},
          {
          $addToSet: { 
            appointments: {
              vet: vetData,
              appointmentDate: appDate,
              appointmentTime: appTime,
              appointmentText: appText
            }
          },
        });

        return user;
      // }

      // throw AuthenticationError;
    },

    updateAppointment: async (parent, { appointmentId, appointmentText}, context) => {
      // if (context.user) {
        const user = await User.findOneAndUpdate({'appointments._id' : appointmentId}, {
          $set: {'appointments.$.appointmentText': appointmentText },
        });
        return user;
      // }
      // throw AuthenticationError;
    },

    removeAppointment: async (parent, { appointmentId}, context) => {
      // if (context.user) {
        const user = await User.findOneAndUpdate({'appointments._id' : appointmentId}, {
          $pull: {
            appointments: {
              _id: appointmentId,
            },
          }
        });
        return user;
      // }
      // throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
