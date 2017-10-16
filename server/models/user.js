/* eslint-disable object-shorthand */
const db = require('./db');

const User = {};

User.findByUsername = (username, email) => {
  return db('users').where({ username: username }).orWhere({ email: email }).select('*')
    .then(user => {
      return user;
    })
    .catch(err => {
      console.error(err);
    });
};

User.createNewUser = (username, password, email) => {
  return db('users').insert({ username: username, password: password, email: email })
    .then(() => {
      console.log('User successfully inserted into DB.');
      return db('users').where({ username: username }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = User;
