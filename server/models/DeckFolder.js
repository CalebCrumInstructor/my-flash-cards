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
    cardCount: {
      type: Number,
      default: 0,
      required: true
    },
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
      getters: true,
      virtuals: true
    },
    id: false
  }
);

// ! Will need to add more code to ensure cardCount stays up to date
deckFolderSchema.pre('save', async function (next) {
  this.cardCount = this.cards.length;

  next();
});

const DeckFolder = model('DeckFolder', deckFolderSchema);

module.exports = DeckFolder;
