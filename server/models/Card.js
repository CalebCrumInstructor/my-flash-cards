const { Schema, Types } = require('mongoose');
const bcrypt = require('bcrypt')

const cardSchema = new Schema(
  {
    frontContent: {
      type: String,
      required: true,
      default: ''
    },
    backContent: {
      type: String,
      required: true,
      default: ''
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

module.exports = cardSchema;
