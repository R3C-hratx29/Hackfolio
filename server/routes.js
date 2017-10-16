/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const User = require('./models/user.js');
const Profile = require('./models/profile.js');

const secret = 'shakeweight';

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  User.findByUsername(username, email)
    .then(user => {
      if (user.length) {
        res.status(409);
        res.send('User already exists.');
      }

      if (!user.length) {
        bcrypt.hash(password, 10, (err, hash) => {
          User.createNewUser(username, hash, email)
            .then(user => {
              const payload = { user_id: user[0].uid };
              const token = jwt.encode(payload, secret);

              res.status(201);
              res.set({ User_Id: user[0].uid, Jwt: token });
              res.send({ User_Id: user[0].uid, Jwt: token });
            })
        });

      }
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/signin', (req, res) => {
  let username = null;
  const password = req.body.password;
  let email = null;

  if (req.body.username) {
    username = req.body.username;
  }

  if (req.body.email) {
    email = req.body.email;
  }

  User.findByUsername(username, email)
    .then(user => {
      if (!user.length) {
        res.status(401);
        res.send('User does not exist.');
      }

      if (user.length) {
        bcrypt.compare(password, user[0].password, (err, match) => {
          if (match) {
            const payload = { user_id: user[0].uid };
            const token = jwt.encode(payload, secret);

            res.status(201);
            res.set({ User_Id: user[0].uid, Jwt: token });
            res.send({ User_Id: user[0].uid, Jwt: token });
          }

          if (!match) {
            res.status(401);
            res.send('Incorrect password');
          }
        });
      }
    });
});


router.post('/profile', (req, res) => {
  const data = { user_id: req.body.user_id, bio: req.body.bio, profile_pic: req.body.profile_pic, profession: req.body.profession, name: req.body.name };

  Profile.createProfile(data)
    .then(profile => {
      res.send(profile);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
