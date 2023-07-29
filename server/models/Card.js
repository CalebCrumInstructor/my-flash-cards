const { Schema, Types } = require('mongoose');

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

cardSchema.pre('save', async function (next) {
  if (this.isModified('frontContent')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  if (this.isModified('backContent')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

module.exports = cardSchema;
