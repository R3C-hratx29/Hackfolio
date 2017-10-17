const db = require('./db');

const Link = {};

Link.findByTitle = (_title, _profile_id) => {
  return db('links').where({
    title: _title,
    profile_id: _profile_id
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
      return db('links').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Link.updateLink = (data) => {
  return db('links').where({
    title: data.title
  })
    .update({
      title: data.title,
      link: data.link,
      icon: data.icon
    })
    .then(() => {
      return db('links').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Link;
