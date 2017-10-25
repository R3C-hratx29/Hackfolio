const db = require('./db');

const Message = {};

Message.post = (conversationId, receiver, sender, message) => {
  return db('messages').insert({
    conversation_id: conversationId,
    receiver,
    sender,
    message
  });
};

Message.getByBounty = (bountyId, userId) => {
  return db.from('messages').innerJoin('bounties', 'messages.bounty_id', 'bounties.bounty_id')
    .where({ 'bounties.bounty_id': bountyId })
    .andWhere({ owner_id: userId })
    .orWhere({ bounty_hunter: userId });
};

Message.getByConversation = (conversationId) => {
  return db.from('messages')
    .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
    .where({ 'conversations.conversation_id': conversationId });
};

module.exports = Message;
