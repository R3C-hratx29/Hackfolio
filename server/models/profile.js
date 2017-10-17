/* eslint-disable prefer-destructuring */
const db = require('./db');

const Profile = {};

Profile.findAllByUserId = (userId) => {
  return db('profiles').where({ user_id: userId }).select('*')
    .then(profile => {
      return profile;
    })
    .catch(err => {
      console.error(err);
    });
};

Profile.createProfile = (data) => {
  return db('profiles').insert({
    user_id: data.user_id,
    bio: data.bio,
    profile_pic: data.profile_pic,
    profession: data.profession,
    name: data.name
  })
    .then(() => {
      return db('profiles').where({ user_id: data.user_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Profile.updateProfile = (data) => {
  return db('profiles').where({
    user_id: data.user_id
  })
    .update({
      bio: data.bio,
      profile_pic: data.profile_pic,
      profession: data.profession,
      name: data.name
    })
    .then(() => {
      return db('profiles').where({ user_id: data.user_id }).select('*');
    });
};

module.exports = Profile;
