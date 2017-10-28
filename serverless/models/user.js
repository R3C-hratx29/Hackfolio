/* eslint-disable no-console */

const db = require('./db');
// const Profile = require('./profile');

const User = {};

User.findByUsername = (_username) => {
  return db('users').where({ username: _username }).orWhere({ email: _username }).select('*')
    .then(user => {
      return user;
    })
    .catch(err => {
      console.error(err);
    });
};

User.createNewUser = (_username, _password, _email) => {
  return db('users').insert({ username: _username, password: _password, email: _email })
    .then(() => {
      console.log('User successfully inserted into DB.');
      return db('users').where({ username: _username }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = User;
