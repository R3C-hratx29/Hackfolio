/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jwt-simple');
const User = require('../models/user.js');
const Profile = require('../models/profile.js');

const secret = process.env.SECRET;

// Github oAuth2 ------------------------------
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  const data = {
    username: res.req.user._json.login,
    email: res.req.user._json.email,
    name: res.req.user._json.name,
    bio: res.req.user._json.bio,
    profile_pic: res.req.user._json.avatar_url,
    github: res.req.user.profileUrl
  };

  User.findByUsername(data.username, data.email)
    .then(users => {
      if (!users.length) {
        User.createNewUser(data.username, null, data.email).then(user => {
          const payload = { username: user[0].username, user_id: user[0].uid };
          const token = jwt.encode(payload, secret);
          data.uid = user[0].uid;

          Profile.init(data);
          res.set({ username: user[0].username, jwt: token });
          res.redirect(302, 'http://localhost:3000/github/'+token+'/'+data.username);
        });
      }

      if (users.length) {
        const payload = { username: users[0].username, user_id: users[0].uid };
        const token = jwt.encode(payload, secret);
        res.set({ username: users[0].username, jwt: token });
        res.redirect(302, 'http://localhost:3000/github/'+token+'/'+data.username);
      }
    });
});
// Github oAuth2 ------------------------------

module.exports = router;
