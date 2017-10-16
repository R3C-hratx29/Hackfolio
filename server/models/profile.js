/* eslint-disable */
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

Profile.createProfile = (data) => {
  return db('profiles').insert({ user_id: data.user_id, bio: data.bio, profile_pic: data.profile_pic, profession: data.profession, name: data.name })
    .then(profile => {
      console.log('Profile successfully created.')
      return db('profiles').where({ user_id: data.user_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Profile;
