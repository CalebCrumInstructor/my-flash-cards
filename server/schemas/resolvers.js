const { User, DeckFolder } = require('../models');
const { signToken, AuthenticationError, UserInputError, emailHasAccount, emailDoesNotHaveAccount, incorrectPassword } = require('../utils/auth');
const { dateScalar } = require('./scalar');
const createDeckAndFolderArrays = require('../lib/helperFunctions/createDeckAndFolderArrays')

const removeFolders = async (objId) => {
  const deckFolderData = await DeckFolder.findByIdAndUpdate(
    objId,
    {
      status: 'removed'
    },
    {
      new: true,
      runValidators: true
    });

  await Promise.all(deckFolderData.subFolder.map(removeFolders));
}

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
    createFolder: async (parent, { parentDeckFolderId, title }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      if (!parentDeckFolderId) {
        const userData = await User.findById(context.user._id);

        const deckFolderData = await DeckFolder.create({
          title,
          createdByUser: context.user._id,
          parentDeckFolder: null,
          isFolder: true
        });

        userData.rootFolder.push(deckFolderData);

        await userData.save();

        return deckFolderData;
      }

      const parentDeckFolderData = await DeckFolder.findById(parentDeckFolderId)

      if (parentDeckFolderData.createdByUser.toString() !== context.user._id) {
        throw AuthenticationError;
      }

      const deckFolderData = await DeckFolder.create({
        title,
        createdByUser: context.user._id,
        parentDeckFolder: parentDeckFolderData._id,
        isFolder: true
      });

      parentDeckFolderData.subFolder.push(deckFolderData);

      await parentDeckFolderData.save();

      return deckFolderData;
    },
    deleteFolder: async (parent, { parentDeckFolderId, deckFolderId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const deckFolderData = await DeckFolder.findOneAndUpdate(
        {
          _id: deckFolderId,
          createdByUser: context.user._id
        },
        {
          status: 'removed'
        },
        {
          new: true,
          runValidators: true
        });

      await Promise.all(deckFolderData.subFolder.map(removeFolders));

      if (!parentDeckFolderId) {
        const userData = await User.findByIdAndUpdate(context.user._id, { $pull: { rootFolder: deckFolderId } });
      } else {
        const parentDeckFolderData = await DeckFolder.findOneAndUpdate({
          _id: parentDeckFolderId,
          createdByUser: context.user._id
        }, { $pull: { subFolder: deckFolderId } });
      }

      return deckFolderData;
    },
    editFolderTitle: async (parent, { title, deckFolderId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const deckFolderData = await DeckFolder.findOneAndUpdate(
        {
          _id: deckFolderId,
          createdByUser: context.user._id
        },
        {
          title
        },
        {
          new: true,
          runValidators: true
        });

      return {
        message: 'successful edit'
      };
    },
    moveDeckFolder: async (parent, { oldParentFolderId, deckFolderId, newParentFolderId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      if (!deckFolderId || (!oldParentFolderId && !newParentFolderId)) {
        throw UserInputError;
      }

      const deckFolderData = await DeckFolder.findOne({
        _id: deckFolderId,
        createdByUser: context.user._id
      });

      if (!deckFolderData) {
        throw UserInputError;
      }

      deckFolderData.parentDeckFolder = newParentFolderId ? newParentFolderId : null;

      deckFolderData.save();

      if (!newParentFolderId) {
        const userData = await User.findById(context.user._id);
        userData.rootFolder.push(deckFolderData);
        await userData.save();

        const parentDeckFolderData = await DeckFolder.findOneAndUpdate({
          _id: oldParentFolderId,
          createdByUser: context.user._id
        }, { $pull: { subFolder: deckFolderId } });

        return {
          message: 'moveDeckFolder Success'
        };
      };

      const newParentDeckFolderData = await DeckFolder.findOneAndUpdate({
        _id: newParentFolderId,
        createdByUser: context.user._id
      }, { $push: { subFolder: deckFolderId } });

      if (!oldParentFolderId) {
        const parentDeckFolderData = await User.findByIdAndUpdate(context.user._id, { $pull: { rootFolder: deckFolderId } });

        return {
          message: 'moveDeckFolder Success'
        };
      }

      const parentDeckFolderData = await DeckFolder.findOneAndUpdate({
        _id: oldParentFolderId,
        createdByUser: context.user._id
      }, { $pull: { subFolder: deckFolderId } });

      return {
        message: 'moveDeckFolder Success'
      };
    },
  }
};

module.exports = resolvers;
