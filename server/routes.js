/* eslint-disable */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const User = require('./models/user.js');
const Profile = require('./models/profile.js');
const Link = require('./models/link.js');
const Project = require('./models/project.js');

const secret = 'shakeweight';

// TODO: Refactor routes into seperate files.

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username && password && email) {
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
                res.set({ 'User_Id': data[0].uid, 'Jwt': token });
                res.send({ 'User_Id': data[0].uid, 'Jwt': token });
              });
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    res.send('Please fill out all forms.');
  }
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
        console.log(user);
        bcrypt.compare(password, user[0].password, (err, match) => {
          if (match) {
            const payload = { user_id: user[0].uid };
            const token = jwt.encode(payload, secret);

            res.status(201);
            res.set({ 'User_Id': user[0].uid, 'Jwt': token });
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

// TODO: Mother of God this monster needs to be refactored.
router.post('/profile', (req, res) => {
  if (req.headers.jwt) {
    // TODO: Refactor this authentication into a seperate file.
    const dLoad = jwt.decode(req.headers.jwt, secret);
    const profileData = {
      user_id: dLoad.user_id,
      bio: req.body.bio,
      profile_pic: req.body.profile_pic,
      profession: req.body.profession,
      name: req.body.name
    };
    const linkData = req.body.links;

    Profile.findAllByUserId(profileData.user_id)
      .then(profile => {
        if (!profile.length) {
          Profile.createProfile(profileData)
            .then(pData => {
              linkData.forEach(e => {
                e.profile_id = pData[0].id;
                if (e.title.length && e.title) {
                  Link.addLink(e);
                } else {
                  res.send('Insignificant data: title.');
                }
              });
              pData[0].links = linkData;
              res.status(201);
              res.send(pData[0]);
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          Profile.updateProfile(profileData)
            .then(pData => {
              linkData.forEach(e => {
                e.profile_id = pData[0].id;
                if (e.title && e.title.length) {
                  Link.findByTitle(e.title, e.profile_id)
                    .then(link => {
                      if (!link.length) {
                        Link.addLink(e);
                      } else {
                        Link.updateLink(e);
                      }
                    });
                } else {
                  res.send('Insignificant data: title.');
                }
              });
              pData[0].links = linkData;
              res.status(201);
              res.send(pData[0]);
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
  } else {
    res.send('No authentication detected');
  }
});

router.post('/project', (req, res) => {

});

router.get('/user/:id', (req, res) => {
  const user = req.params.id;

  Profile.findByUsername(user)
    .then(profile => {
      // Shape data to match example data.
      delete profile.password;
      delete profile.email;
      delete profile.uid;

      Link.findByProfileId(profile.id)
        .then(links => {
          profile.socialLinks = links;
          res.send(profile)
        })
    })
    .catch(err => {
      res.status(404);
      res.send(404);
    })

});

module.exports = router;
