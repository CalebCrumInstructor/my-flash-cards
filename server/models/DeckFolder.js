const { Schema, model, Types } = require('mongoose');
const cardSchema = require('./Card');

const deckFolderSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false
    },
    isFolder: {
      type: Boolean,
      required: true,
      default: false
    },
    cards: [cardSchema],
    parentDeckFolder: {
      type: Schema.Types.ObjectId,
      ref: 'DeckFolder'
    },
    createdByUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    subFolder: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DeckFolder'
      }
    ],
    isDeckFolderReference: {
      type: Boolean,
      required: true,
      default: false
    },
    DeckFolderReference: {
      type: Schema.Types.ObjectId,
      ref: 'DeckFolder'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const DeckFolder = model('DeckFolder', deckFolderSchema);

module.exports = DeckFolder;
