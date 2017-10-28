'use strict';
const db = require('./models/db');
const Profile = require('./models/profile.js');
const Project = require('./models/project.js');

module.exports.helloWorld = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
      thanks2webpack: 'es2017!'.padStart(16, 'oh look, ') //
    }),
  };

  callback(null, response);
};

module.exports.profile = (event, context, callback) => {
  const { username } = event.queryStringParameters;

  Profile.findByUsername(username)
    .then(profile => {
      const userProfile = profile || {};
      // Shape data to match example data.
      delete userProfile.password;
      delete userProfile.email;
      delete userProfile.uid;
      userProfile.projects = [];
      Project.findByProfileId(userProfile.id)
        .then(projects => {
          userProfile.projects = projects;

          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify({
              userProfile
            }),
          };

          db.destroy();
          callback(null, response);
        })
        .catch(err => {
          db.destroy();
          callback(err);
        });
    });
};
