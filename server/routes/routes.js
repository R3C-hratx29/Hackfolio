/* eslint-disable no-param-reassign */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const User = require('../models/user.js');
const Profile = require('../models/profile.js');
const Link = require('../models/link.js');
const Project = require('../models/project.js');
const Notification = require('../models/notification.js');

const secret = 'shakeweight';

// TODO: Refactor routes into seperate files.

router.get('/me', (req, res) => {
  if (req.headers.jwt) {
    // headers now have id instead of username
    const headers = jwt.decode(req.headers.jwt, secret);
    res.status(201);
    res.set(headers);
    res.send(headers);
  } else {
    res.send('not logged in');
  }
});

router.get('/logout', (req, res) => {
  res.set({ User_id: undefined, jwt: undefined });
  res.send('true');
});

router.post('/signup', (req, res) => {
  const { username, password, email } = req.body;

  if (username && password && email) {
    User.findByUsername(username, email)
      .then(user => {
        if (user.length) {
          res.status(409);
          if (user[0].username === username) {
            res.send('User already exists.');
          } else if (user[0].email === email) {
            res.send('Email already exists.');
          } else {
            res.send('unknown error');
          }
        }

        if (!user.length) {
          bcrypt.hash(password, 10, (err, hash) => {
            User.createNewUser(username, hash, email).then(data => {
              const payload = { username: data[0].username, user_id: data[0].uid };
              const token = jwt.encode(payload, secret);

              Profile.init(data[0].uid, username);
              res.status(201);
              res.set({ username: data[0].username, Jwt: token });
              res.send({ username: data[0].username, Jwt: token });
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

router.post('/login', (req, res) => {
  const { password, username } = req.body;
  User.findByUsername(username)
    .then(user => {
      if (!user.length) {
        res.status(401);
        res.send('User does not exist.');
      }

      if (user.length) {
        bcrypt.compare(password, user[0].password, (err, match) => {
          if (match) {
            const payload = { username: user[0].username, user_id: user[0].uid };
            const token = jwt.encode(payload, secret);
            res.status(201);
            res.set({ username: user[0].username, Jwt: token });
            res.send({ username: user[0].username, Jwt: token });
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
    const dLoad = jwt.decode(req.headers.jwt, secret);
    const profileData = {
      user_id: dLoad.user_id,
      bio: req.body.bio,
      profile_pic: req.body.profile_pic,
      profession: req.body.profession,
      name: req.body.name,
      socialLinks: req.body.socialLinks,
    };
    const links = profileData.socialLinks;
    Profile.updateProfile(profileData).then(profiles => {
      profiles[0].username = dLoad.username;
      if (links.length) {
        links.forEach(link => {
          link.profile_id = profiles[0].id;
          if (!link.id) {
            Link.addLink(link);
          } else {
            Link.updateLink(link);
          }
        });
      }
      res.status(201);
      res.set({ username: dLoad.username });
      res.end();
    });
  } else {
    res.send('No authentication detected');
  }
});

router.post('/project', (req, res) => {
  if (req.headers.jwt) {
    const dLoad = jwt.decode(req.headers.jwt, secret);
    const projectData = {
      id: req.body.id,
      profile_id: null,
      title: req.body.title,
      description: req.body.description,
      github_link: req.body.github_link,
      website_link: req.body.website_link,
      images: req.body.images,
      stack: req.body.stack,
    };

    Profile.findAllByUserId(dLoad.user_id)
      .then(profile => {
        projectData.profile_id = profile[0].id;
        projectData.images = projectData.images.join(',');
        projectData.stack = projectData.stack.join(',');

        if (projectData.id && projectData.profile_id) {
          Project.findById(projectData.id, projectData.profile_id).then(projects => {
            if (!projects[0].length) {
              Project.updateProject(projectData).then(project => {
                // TODO Just an example to test notifications
                Notification.createNotification({
                  bounty_id: null,
                  user_id: dLoad.user_id,
                  message: `Project "${project[0].title}" was updated.`
                });
                res.set({ username: dLoad.username });
                res.send(project[0]);
              });
            } else {
              res.send('Project does not exist.');
            }
          });
        } else {
          Project.createProject(projectData).then(project => {
            res.set({ Username: dLoad.username });
            res.send(project[project.length - 1]);
          });
        }
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.send('No authentication detected');
  }
});

router.put('/project', (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  req.body.forEach(project => {
    Project.updateOrder(project).catch(err => {
      console.error(err);
    });
  });
  res.set({ username: dLoad.username });
  res.send(req.body);
});

router.delete('/project/:id', (req, res) => {
  if (req.headers.jwt) {
    const dLoad = jwt.decode(req.headers.jwt, secret);
    Project.deleteProject(req.params.id);

    res.status(201);
    res.set({ Username: dLoad.username });
    res.send('Project successfully deleted.');
  } else {
    res.send('No authentication detected');
  }
});

router.get('/user/:id', (req, res) => {
  const user = req.params.id;
  Profile.findByUsername(user)
    .then(profile => {
      // Shape data to match example data.
      delete profile.password;
      delete profile.email;
      delete profile.uid;
      profile.projects = [];

      Link.findByProfileId(profile.id)
        .then(links => {
          profile.socialLinks = links;
          Project.findByProfileId(profile.id)
            .then(projects => {
              profile.projects = projects;

              projects.forEach(project => {
                project.stack = project.stack.split(',');
                project.images = project.images.split(',');
              });

              res.send(profile);
            })
            .catch(err => {
              res.send(err);
            });
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
      res.send(err);
    });
});

router.put('/search', (req, res) => {
  Profile.search(req.body.text)
    .then((searchResults) => {
      searchResults.forEach((result) => {
        delete result.password;
        delete result.uid;
        delete result.user_id;
        delete result.id;
      });
      res.send(searchResults);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(402);
    });
});

router.get('/notifications', (req, res) => {
  if (req.headers.jwt) {
    // headers now have id instead of username
    const headers = jwt.decode(req.headers.jwt, secret);
    res.status(200);
    res.set(headers);
    Notification.findByUserId(headers.user_id)
      .then((notifications) => {
        res.send(notifications);
      });
  } else {
    res.send('not logged in');
  }
});

module.exports = router;
