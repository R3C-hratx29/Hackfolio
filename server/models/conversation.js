const db = require('./db');

const Conversation = {};

Conversation.post = (bountyId, bountyHunter, ownerId, name) => {
  return db('messages').insert({
    bounty_id: bountyId,
    owner_id: ownerId,
    bounty_hunter: bountyHunter,
    name
  });
};

Conversation.getByBounty = (bountyId, userId) => {
  return db.from('conversations').where({ bounty_id: bountyId })
    .then((results) => {
      if (results[0].owner_id === userId) {
        return db.from('conversations').innerJoin('users', 'conversations.bounty_hunter', 'users.uid');
      }
      return db.from('conversations')
        .innerJoin('users', 'conversations.owner_id', 'users.uid')
        .where({ 'conversation.bounty_hunter': userId });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = Conversation;
