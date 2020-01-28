import passport from 'koa-passport';
import LocalStrategy from 'passport-local';

import dynamodb from '../services/db';
import { TABLE_NAME } from '../services/config';
import User from '../models/user';

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

function getUser(callback) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      'PK': { 'S': 'USER#brocksantana@vantage.com' }, // eslint-disable-line quote-props
      'SK': { 'S': '#METADATA#brocksantana@vantage.com' }, // eslint-disable-line quote-props
    },
  };

  dynamodb.getItem(params, (err, data) => {
    if (err) console.log('Error', err); // eslint-disable-line no-console
    else callback(data);
  });
}

passport.use(new LocalStrategy(options, (email, password, done) => {
  return getUser((data) => {
    if (!data) return done(null, false);
    const userData = { ...data };
    return done(null, User.serialize(userData));
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.pk);
});

passport.deserializeUser((userPK, done) => {
  return getUser((data) => {
    if (!data) return done(null, false);
    const userData = { ...data };
    return done(null, User.serialize(userData));
  });
});

export default passport;
