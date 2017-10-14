const db = require('./db');

const User = {};

User.findByUsername = (username) => {
  return db('users').where({ username: username }).select('*')
    .then(user => {
      return user;
    })
    .catch(err => {
      console.error(err);
    });
};

User.createNewUser = (username, password) => {
  db('usres').insert({ username: username, password: password })
    .then(() => {
      console.log('User successfully inserted into DB.');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = User;
