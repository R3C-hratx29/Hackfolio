/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const Auth = require('../auth.js');
const User = require('../models/user.js');
const Profile = require('../models/profile.js');
const Project = require('../models/project.js');
const Notification = require('../models/notification.js');
const Message = require('../models/message.js');
const Conversation = require('../models/conversation.js');

const secret = process.env.SECRET;

// TODO: Refactor routes into seperate files.
router.get('/me', (req, res) => {
  const headers = jwt.decode(req.headers.jwt, secret);
  res.status(201);
  res.set(headers);
  res.send(headers);
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
              Profile.init(data[0]);
              res.status(201);
              res.set({
                username: user[0].username,
                Jwt: token,
                user_id: user[0].uid
              });
              res.send({ username: user[0].username, Jwt: token });
            });
          });
        }
      })
      .catch(err => {
        throw err;
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
            res.set({
              username: user[0].username,
              Jwt: token,
              user_id: user[0].uid
            });
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
    facebook: req.body.facebook
  };
  Profile.updateProfile(profileData).then(profiles => {
    profiles[0].username = dLoad.username;
    res.send(profiles[0]);
  });
});

router.post('/project', Auth.isLoggedIn, (req, res) => {
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
      projectData.images = projectData.images;
      projectData.stack = projectData.stack;

      if (projectData.id && projectData.profile_id) {
        Project.findById(projectData.id, projectData.profile_id).then(projects => {
          if (!projects[0].length) {
            Project.updateProject(projectData).then(project => {
              Notification.createNotification({
                user_id: dLoad.user_id,
                bounty_id: null,
                message: `Project "${project[0].title}" has been updated.`
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
});

router.put('/project', Auth.isLoggedIn, (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  req.body.forEach(project => {
    Project.updateOrder(project).catch(err => {
      throw err;
    });
  });
  res.set({ username: dLoad.username });
  res.send(req.body);
});

router.delete('/project/:id', Auth.isLoggedIn, (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  Project.deleteProject(req.params.id);

  res.status(201);
  res.set({ Username: dLoad.username });
  res.send('Project successfully deleted.');
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
      Project.findByProfileId(profile.id).then(projects => {
        profile.projects = projects;
        res.send(profile);
      })
        .catch(err => {
          throw err;
        });
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
        delete result.email;
      });
      res.send(searchResults);
    })
    .catch(err => {
      res.sendStatus(402);
      throw err;
    });
});

router.get('/notifications', Auth.isLoggedIn, (req, res) => {
  const headers = jwt.decode(req.headers.jwt, secret);
  res.status(200);
  res.set(headers);
  Notification.findByUserId(headers.user_id)
    .then((notifications) => {
      res.send(notifications);
    });
});

router.delete('/notifications/:id', Auth.isLoggedIn, (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  Notification.deleteNotification(dLoad, req.params.id)
    .then(() => {
      res.status(201);
      res.send('Notification successfully deleted.');
    });
});

router.delete('/notifications', Auth.isLoggedIn, (req, res) => {
  const dLoad = jwt.decode(req.headers.jwt, secret);
  Notification.deleteAllNotifications(dLoad)
    .then(() => {
      res.status(201);
      res.send('notifications successfully deleted.');
    });
});

router.post('/message', Auth.isLoggedIn, (req, res) => {
  Message.post(req.body.conversationId, req.body.receiver, req.body.sender, req.body.text)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      res.end();
      throw err;
    });
});

router.post('/conversations', (req, res) => {
  Conversation.post(req.body.bountyId, req.body.bountyHunter, req.body.ownerId, req.body.name)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      res.end();
      throw err;
    });
});

router.get('/messages', Auth.isLoggedIn, (req, res) => {
  console.log('in messages');
  const conversationId = parseInt(req.query.conversationId, 10);
  Message.getByConversation(conversationId)
    .then((results) => {
      console.log(results);
      res.send(results);
    })
    .catch((err) => {
      res.sendStatus(401);
      throw err;
    });
});

router.get('/conversations', Auth.isLoggedIn, (req, res) => {
  const bountyId = parseInt(req.query.bountyId, 10);
  const dLoad = jwt.decode(req.headers.jwt, secret);
  Conversation.getByBounty(bountyId, dLoad.user_id)
    .then((results) => {
      results.forEach((el) => {
        delete el.email;
        delete el.password;
      });
      console.log('****', results);
    })
    .catch((err) => {
      console.log(err);
      res.end();
      throw err;
    });
});

module.exports = router;
