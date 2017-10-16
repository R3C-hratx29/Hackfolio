/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const User = require('./models/user.js');

const secret = 'shakeweight';

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findByUsername(username)
    .then(user => {
      if (user.length) {
        res.status(409);
        res.send('User already exists.');
      }

      if (!user.length) {
        bcrypt.hash(password, 10, (err, hash) => {
          User.createNewUser(username, hash);
        });
        const payload = { user: username };
        const token = jwt.encode(payload, secret);

        res.status(201);
        res.set({ Jwt: token });
        res.send({ Jwt: token });
      }
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findByUsername(username)
    .then(user => {
      if (!user.length) {
        res.status(401);
        res.send('User does not exist.');
      }

      if (user.length) {
        bcrypt.compare(password, user[0].password, (err, match) => {
          if (match) {
            const payload = { user: username };
            const token = jwt.encode(payload, secret);

            res.status(201);
            res.set({ Jwt: token });
            res.send({ Jwt: token });
          }

          if (!res) {
            res.status(401);
            res.send('Incorrect password');
          }
        });
      }
    });
});

module.exports = router;
