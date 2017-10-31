/* eslint-disable prefer-destructuring */
const Project = require('./project.js');

const Profile = {};

const response = require('../response.js');

Profile.init = (db, data) => {
  db('profiles').insert({
    user_id: data.uid,
    bio: data.bio || 'Edit your bio here...',
    profile_pic: data.profile_pic || 'https://tinyurl.com/ybny9zhw',
    profession: 'Edit your profession here...',
    name: data.name || data.username,
    github: data.github || null,
    linked_in: null,
    twitter: null,
    facebook: null,
    resume: null
  })
    .then(() => {
      db('profiles').where({ user_id: data.userId }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Profile.findByUsername = (db, _username) => {
  return db('users').where({ username: _username })
    .join('profiles', 'users.uid', 'profiles.user_id')
    .select('*')
    .then(profile => {
      return new Promise((resolve, reject) => {
        if (profile[0]) {
          resolve(profile[0]);
        } else {
          reject(Error('User not found'));
        }
      });
    })
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
      facebook: data.facebook,
      resume: data.resume
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

Profile.getUser = (db, username) => {
  let userProfile;
  return Profile.findByUsername(db, username)
    .then(profile => {
      userProfile = profile;
      // Shape data to match example data.
      delete userProfile.password;
      delete userProfile.email;
      delete userProfile.uid;
      return Project.findByProfileId(db, userProfile.id);
    })
    .then(projects => {
      userProfile.projects = projects;
      return response({
        userProfile
      });
    })
    .catch((err) => {
      return response({
        error: err.message
      }, 404);
    });
};

module.exports = Profile;
