/* eslint-disable prefer-promise-reject-errors */

const jwt = require('jwt-simple');

const response = require('./response.js');
const dbInit = require('./models/db');
const Profile = require('./models/profile.js');
const User = require('./models/user.js');


const SECRET = 'shakeweight';

const isLoggedIn = (event) => {
  const token = event.headers.jwt;

  return new Promise((resolve, reject) => {
    try {
      const user = jwt.decode(token, SECRET);
      user.jwt = token;
      resolve(user);
    } catch (err) {
      if (err.message.includes('Unexpected')) {
        reject('Invalid token.');
      } else {
        reject(err.message);
      }
    }
  });
};

// GET - https://2yks6utfgk.execute-api.us-east-1.amazonaws.com/dev/user/{username}
module.exports.user = (event, context, callback) => {
  const db = dbInit();
  const { username } = event.pathParameters;

  Profile.getUser(db, username)
    .then(res => {
      callback(null, res);
    })
    .then(() => {
      db.destroy();
    });
};

// GET - https://2yks6utfgk.execute-api.us-east-1.amazonaws.com/dev/me
// Must have a `jwt` header
module.exports.me = (event, context, callback) => {
  isLoggedIn(event)
    .then((user) => {
      callback(null, response(user, 200, user));
    })
    .catch((err) => {
      callback(null, response({
        error: err
      }, 201));
    });
};

// POST - https://2yks6utfgk.execute-api.us-east-1.amazonaws.com/dev/signup
// {username: string, password: string, email: string}
module.exports.signup = (event, context, callback) => {
  const db = dbInit();
  const { username, password, email } = JSON.parse(event.body);

  User.signup(db, username, password, email)
    .then(res => {
      callback(null, res);
    })
    .catch((res) => {
      callback(null, res);
    })
    .then(() => {
      db.destroy();
    });
};
