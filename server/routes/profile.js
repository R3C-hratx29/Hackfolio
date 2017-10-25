/* eslint-disable no-param-reassign */
const router = require('express').Router();
const jwt = require('jwt-simple');
const Profile = require('../models/profile.js');
const Auth = require('./auth.js');

const secret = process.env.SECRET;

router.post('/profile', Auth.isLoggedIn, (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  const profileData = {
    user_id: dLoad.user_id,
    bio: req.body.bio,
    profile_pic: req.body.profile_pic,
    profession: req.body.profession,
    name: req.body.name,
    github: req.body.github,
    linked_in: req.body.linked_in,
    twitter: req.body.twitter,
    facebook: req.body.facebook,
    resume: req.body.resume
  };
  Profile.updateProfile(profileData).then(profiles => {
    profiles[0].username = dLoad.username;
    res.send(profiles[0]);
  });
});

module.exports = router;
