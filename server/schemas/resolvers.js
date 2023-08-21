const { User, DeckFolder } = require('../models');
const { signToken, AuthenticationError, UserInputError, emailHasAccount, emailDoesNotHaveAccount, incorrectPassword } = require('../utils/auth');
const { dateScalar } = require('./scalar');
const createDeckAndFolderArrays = require('../lib/helperFunctions/createDeckAndFolderArrays')

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
                select: '-cards -__v',
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
          ]);

        const { deckArr, folderArr } = createDeckAndFolderArrays(data.rootFolder);

        return {
          rootFolder: data.rootFolder,
          deckArr,
          folderArr
        };
      } catch (err) {
        console.log(err);
      }
    },
    deckFolderDepthOfFourByIdPrivate: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      try {

        const { _id } = args;

        const data = await DeckFolder.findOne({
          _id,
          createdByUser: context.user._id
        })
          .select('_id')
          .populate([
            {
              path: 'subFolder',
              select: '-cards -__v',
              populate: {
                path: 'subFolder',
                select: '-cards -__v',
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
          ]);

        const { deckArr, folderArr } = createDeckAndFolderArrays(data.subFolder);

        return {
          subFolder: data.subFolder,
          deckArr,
          folderArr
        };
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
