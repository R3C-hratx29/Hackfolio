/* eslint-disable no-console */

// const db = require('./db');
// const Profile = require('./profile');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const response = require('../response.js');

const Profile = require('./profile.js');

const SECRET = 'shakeweight';

const User = {};

User.findByUsername = (db, _username) => {
  return db('users').where({ username: _username }).orWhere({ email: _username }).select('*')
    .then(user => {
      return user;
    })
    .catch(err => {
      console.error(err);
    });
};

User.createNewUser = (db, _username, _password, _email) => {
  return db('users').insert({ username: _username, password: _password, email: _email })
    .then(() => {
      console.log('User successfully inserted into DB.');
      return db('users').where({ username: _username }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

User.signup = (db, username, password, email) => {
  let userData;
  return new Promise((resolve, reject) => {
    if (username && password && email) {
      resolve(User.findByUsername(db, username, email));
    } else {
      reject(new Error('Please fill out all forms.'));
    }
  })
    .then(user => {
      return new Promise((resolve, reject) => {
        if (user.length) {
          let errorMessage;
          if (user[0].username === username) {
            errorMessage = 'User already exists.';
          } else if (user[0].email === email) {
            errorMessage = 'Email already exists.';
          } else {
            errorMessage = 'unknown error';
          }
          reject(new Error(errorMessage));
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            resolve(User.createNewUser(db, username, hash, email));
          });
        }
      });
    })
    .then(data => {
      userData = data;
      return Profile.init(db, data[0]);
    })
    .then(() => {
      const payload = { username: userData[0].username, user_id: userData[0].uid };
      const token = jwt.encode(payload, SECRET);
      return response({
        username: userData[0].username,
        jwt: token,
        user_id: userData[0].uid
      });
    })
    .catch((err) => {
      return response({
        error: err.message
      }, 404);
    });
};

module.exports = User;
