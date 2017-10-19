const db = require('./db');

const Link = {};

Link.findByProfileId = (profileId) => {
  return db('links').where({ profile_id: profileId }).select('*')
    .then(links => {
      return links;
    })
    .catch(err => {
      console.error(err);
    });
};

Link.findByTitle = (_id, profileId) => {
  return db('links').where({
    id: _id,
    profile_id: profileId
  })
    .select('*')
    .then(link => {
      return link;
    })
    .catch(err => {
      console.error(err);
    });
};

Link.addLink = (data) => {
  return db('links')
    .insert({
      profile_id: data.profile_id,
      title: data.title,
      link: data.link,
      icon: data.icon
    })
    .then(() => {
      return db('links').where({ title: data.title, profile_id: data.profile_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Link.updateLink = (data) => {
  return db('links').where({
    id: data.id,
    profile_id: data.profile_id
  })
    .update({
      title: data.title,
      link: data.link,
      icon: data.icon
    })
    .then(() => {
      return db('links').where({ title: data.title, profile_id: data.profile_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Link;
