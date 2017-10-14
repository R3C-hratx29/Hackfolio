/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const User = require('./models/user.js');

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
        User.createNewUser(username, password);
        res.status(201);
      }
      console.log(res.body);
    });
});

router.get('/signin', (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;

  User.findByUsername(username)
    .then(user => {
      if (!user.length) {
        res.status(401);
        res.send('User does not exist.');
      }

      if (user.length) {
        res.send({ user: user[0] });
      }

      if (!res) {
        res.status(401);
        res.send('Incorrect password.');
      }
    });
});

module.exports = router;
