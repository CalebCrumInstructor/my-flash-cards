const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const validRoles = ['superAdmin', 'admin', 'user']

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      masLength: 25
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      validate: {
        validator: function (value) {
          return validRoles.includes(value)
        },
        message: 'Invalid role value'
      }
    },
    isBlocked: {
      type: Boolean,
      default: false,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    rootFolder: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DeckFolder'
      }
    ],
    starredFolder: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DeckFolder'
      }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
