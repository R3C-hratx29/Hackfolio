const db = require('./db');

const Message = {};

/* TODO
 * Message.getById = (userId) => {
}; */

Message.getByBounty = (bountyId, userId) => {
  return db.from('messages').innerJoin('bounties', 'messages.bounty_id', 'bounties.bounty_id')
    .where({ bounty_id: bountyId })
    .andWhere({ owner_id: userId })
    .orWhere({ bounty_hunter: userId });
};

module.exports = Message;
