const db = require('./db');

const Project = {};

Project.findByProfileId = (_title, profileId) => {
  return db('projects').where({
    title: _title,
    profile_id: profileId
  })
    .select('*')
    .then(project => {
      return project;
    })
    .catch(err => {
      console.error(err);
    });
};

Project.createProject = (data) => {
  return db('projects').insert({
    profile_id: data.profile_id,
    title: data.title,
    description: data.description,
    github_link: data.github_link,
    website_link: data.website_link
  })
    .then(() => {
      return db('projects').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Project.updateProject = (data) => {
  return db('profiles').where({
    title: data.title
  })
    .update({
      title: data.title,
      description: data.description,
      github_link: data.github_link,
      website_link: data.website_link
    })
    .then(() => {
      return db('links').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Project;
