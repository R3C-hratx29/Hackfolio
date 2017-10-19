const db = require('./db');

const Image = {};

Image.findByProjectId = (projectId) => {
  return db('images').where({ project_id: projectId }).select('*')
    .then(images => {
      return images;
    })
    .catch(err => {
      console.error(err);
    });
};

Image.findByTitle = (_id, projectId) => {
  return db('images').where({
    id: _id,
    project_id: projectId
  })
    .select('*')
    .then(images => {
      return images;
    })
    .catch(err => {
      console.error(err);
    });
};

Image.addImage = (data) => {
  return db('images')
    .insert({
      project_id: data.project_id,
      link: data.link
    })
    .then(() => {
      return db('images'.where({ link: data.link, project_id: data.project_id }));
    })
    .catch(err => {
      console.error(err);
    });
};

Image.updateImage = (data) => {
  return db('images').where({
    id: data.id,
    project_id: data.project_id
  })
    .update({
      link: data.link
    })
    .then(() => {
      return db('images').where({ id: data.id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Image;
