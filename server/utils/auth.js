const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  UserInputError: new GraphQLError('Incorrect User Input.', {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  }),
  emailHasAccount: new GraphQLError('This email already has an account. Please go to the login page.', {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  }),
  emailDoesNotHaveAccount: new GraphQLError('This email does not have an account. Please go to the sign up page.', {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  }),
  incorrectPassword: new GraphQLError('Incorrect Password', {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  }),
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;


    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function (payload) {
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
