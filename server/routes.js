/* eslint-disable */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const User = require('./models/user.js');
const Profile = require('./models/profile.js');

const secret = 'shakeweight';

// TODO: Refactor routes into seperate files.

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
            .then(data => {
              const payload = { user_id: data[0].uid };
              const token = jwt.encode(payload, secret);

              res.status(201);
              res.send({ User_Id: data[0].uid, Jwt: token });
            });
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/signin', (req, res) => {
  const password = req.body.password;
  let username = null;
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
  if (req.headers.jwt) {
    // TODO: Refactor this authentication into a seperate file.
    let dLoad = jwt.decode(req.headers.jwt, secret);
    const data = { user_id: dLoad.user_id, bio: req.body.bio, profile_pic: req.body.profile_pic, profession: req.body.profession, name: req.body.name };

    Profile.findAllByUserId(data.user_id)
      .then(profile => {
        if (!profile.length) {
          Profile.createProfile(data)
          .then(profile => {
            res.status(201);
            res.send(profile);
          })
          .catch(err => {
            console.error(err);
          });
        } else {
          res.status(401);
          res.send('Profile already exists');
        }
      });
  } else {
    res.send('No authentication detected');
  }

});

module.exports = router;
