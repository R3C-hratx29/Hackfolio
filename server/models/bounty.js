const db = require('./db');

const Bounty = {};

Bounty.findAll = () => {
  return db('bounties').select('*');
};

Bounty.addBounty = (data) => {
  return db('bounties').insert({
    owner_id: data.owner_id,
    title: data.title,
    description: data.description,
    price: data.price,
    stack: data.stack,
    images: data.images
  })
    .then(() => {
      return db('bounties').where({ title: data.title }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Bounty.updateBounty = (data) => {
  return db('bounties').where({
    bounty_id: data.bounty_id
  })
    .update({
      title: data.title,
      description: data.description,
      price: data.price,
      stack: data.stack,
      images: data.images
    })
    .then(() => {
      return db('bounties').where({ bounty_id: data.bounty_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

Bounty.deleteBounty = (_id) => {
  return db('bounties').where({
    bounty_id: _id
  })
    .del()
    .catch(err => {
      console.error(err);
    });
};

module.exports = Bounty;
