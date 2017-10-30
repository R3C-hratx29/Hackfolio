/* eslint-disable func-names */
const db = require('./db');

const Conversation = {};

Conversation.post = (bountyId, bountyHunter, ownerId, name) => {
  return db('conversations').insert({
    bounty_id: bountyId,
    owner_id: ownerId,
    bounty_hunter: bountyHunter,
    name
  });
};

Conversation.getByBounty = (bountyId, userId) => {
  return db.from('bounties').where({ bounty_id: bountyId })
    .then((results) => {
      if (results[0]) {
        if (results[0].owner_id === userId) {
          return db.from('conversations')
            .innerJoin('users', 'conversations.bounty_hunter', 'users.uid')
            .where({ 'conversations.bounty_id': bountyId });
        }
        return db.from('conversations')
          .innerJoin('users', 'conversations.owner_id', 'users.uid')
          .where({
            'conversations.bounty_hunter': userId,
            'conversations.bounty_id': bountyId
          });
      }
      return [];
    })
    .catch((err) => {
      throw err;
    });
};

Conversation.getAll = (userId) => {
  return db.from('users')
    .where({ 'conversations.owner_id': userId })
    .orWhere({ 'conversations.bounty_hunter': userId })
    .join('conversations', (function () {
      this.on(function () {
        this.on('conversations.owner_id', '=', 'users.uid');
        this.orOn('conversations.bounty_hunter', '=', 'users.uid');
      });
    }))
    .select('username', 'uid', 'conversation_id', 'name', 'bounty_id')
    .then((results) => {
      const ret = [];
      results.forEach((row) => {
        if (row.uid !== userId) {
          ret.push(row);
        }
      });
      return ret;
    });
};

module.exports = Conversation;
