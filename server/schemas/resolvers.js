const { User, DeckFolder } = require('../models');
const { signToken, AuthenticationError, UserInputError, emailHasAccount, emailDoesNotHaveAccount, incorrectPassword } = require('../utils/auth');
const { dateScalar } = require('./scalar');

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      try {
        const data = await User.findById(context.user._id).select('-__v -password');

        return data
      } catch (err) {
        console.log(err);
      }
    },
    rootFolderDepthOfFour: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      try {
        const data = await User.findById(context.user._id)
          .select('_id')
          .populate([
            {
              path: 'rootFolder',
              select: '-cards -__v',
              populate: {
                path: 'subFolder',
                select: ' -__v',
                populate: {
                  path: 'subFolder',
                  select: '-cards -__v',
                  populate: {
                    path: 'subFolder',
                    select: '-cards -__v',
                  }
                }
              }
            }
          ])

        return data.rootFolder;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addUser: async (parent, argObj) => {
      try {
        const user = await User.create(argObj);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw emailHasAccount;
      }
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw emailDoesNotHaveAccount;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw incorrectPassword;
      }

      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
