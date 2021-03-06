/* eslint-disable no-console,no-useless-return */
const db = require('./db');

const Bounty = {};

Bounty.findAll = () => {
  return db('bounties').select('*');
};

Bounty.findByUserId = (userId) => {
  return db('bounties').where({
    owner_id: userId
  })
    .select('*');
};

Bounty.findById = (id) => {
  return db('bounties').where({
    bounty_id: id
  })
    .select('*');
};

Bounty.addBounty = (data) => {
  return db('bounties').insert({
    owner_id: data.owner_id,
    title: data.title,
    description: data.description,
    price: data.price,
    github: data.github,
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
      github: data.github,
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

Bounty.deleteBounty = (id) => {
  return db('conversations').where({ bounty_id: id })
    .then(conversations => {
      if (conversations.length > 0) {
        conversations.forEach((convo) => {
          db('messages').where({ conversation_id: convo.conversation_id })
            .then(() => {
              db('notifications').where({ conversation_id: convo.conversation_id })
                .del()
                .then(() => {
                  console.log('deleted notifications');
                  return;
                });
              return;
            })
            .then(() => {
              db('messages').where({ conversation_id: convo.conversation_id })
                .del()
                .then(() => {
                  console.log('deleted messages');
                  return;
                });
              return;
            })
            .then(() => {
              db('conversations').where({ bounty_id: id })
                .del()
                .then(() => {
                  console.log('deleted conversations');
                  return;
                });
              return;
            })
            .then(() => {
              db('bounties').where({ bounty_id: id })
                .del()
                .then(() => {
                  console.log('deleted bounty', id);
                  return;
                });
              return;
            });
        });
      } else {
        db('bounties').where({ bounty_id: id })
          .del()
          .then(() => {
            console.log('deleted bounty', id);
            return;
          });
      }
    })
    .catch(err => {
      console.error(err);
    });
};
module.exports = Bounty;
