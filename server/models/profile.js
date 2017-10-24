/* eslint-disable prefer-destructuring */
const db = require('./db');

const Profile = {};

Profile.init = (userId, username) => {
  db('profiles').insert({
    user_id: userId,
    bio: 'Edit your bio here...',
    profile_pic: 'https://tinyurl.com/ybny9zhw',
    profession: 'Edit your profession here...',
    name: username,
    github: null,
    linked_in: null,
    twitter: null,
    facebook: null
  })
    .then(() => {
      db('profiles').where({ user_id: userId }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Profile.findByUsername = (_username) => {
  return db('users').where({ username: _username })
    .join('profiles', 'users.uid', 'profiles.user_id')
    .select('*')
    .then(profile => {
      return profile[0];
    })
    .catch(err => {
      console.error(err);
    });
};

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
      name: data.name,
      github: data.github,
      linked_in: data.linked_in,
      twitter: data.twitter,
      facebook: data.facebook
    })
    .then(() => {
      return db('profiles').where({ user_id: data.user_id }).select('*');
    });
};

Profile.search = (text) => {
  const string = `%${text}%`;
  return db.from('profiles').innerJoin('users', 'profiles.user_id', 'users.uid')
    .where('bio', 'like', string)
    .orWhere('profession', 'like', string)
    .orWhere('name', 'like', string);
  // .orWhere('email', 'like', string);
};

module.exports = Profile;
