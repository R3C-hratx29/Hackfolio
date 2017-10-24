const db = require('./db');

const Message = {};

/* TODO
 * Message.getById = (userId) => {
}; */

Message.post = (bountyId, userId, message) => {
  console.log('message post db', bountyId, userId, message);
  return db('messages').insert({
    bounty_id: bountyId,
    bounty_hunter: userId,
    message
  });
};

Message.getByBounty = (bountyId, userId) => {
  return db.from('messages').innerJoin('bounties', 'messages.bounty_id', 'bounties.bounty_id')
    .where({ 'bounties.bounty_id': bountyId })
    .andWhere({ owner_id: userId })
    .orWhere({ bounty_hunter: userId });
};

module.exports = Message;
