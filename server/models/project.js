const db = require('./db');

const Project = {};

Project.findByProfileId = (_id, profileId) => {
  return db('projects').where({
    id: _id,
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
    website_link: data.website_link,
    images: data.images,
    stack: data.stack
  })
    .then(() => {
      return db('projects').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Project.updateProject = (data) => {
  return db('projects').where({
    profile_id: data.profile_id,
    id: data.id
  })
    .update({
      title: data.title,
      description: data.description,
      github_link: data.github_link,
      website_link: data.website_link,
      images: data.images,
      stack: data.stack
    })
    .then(() => {
      return db('projects').where({ id: data.id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Project;
