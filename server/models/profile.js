const db = require('./db');

const Profile = {};

Profile.findAllByUserId = (user_id) => {
  return db('profiles').where({ user_id: user_id }).select('*')
    .then(profile => {
      return profile;
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Profile;
