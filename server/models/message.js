const db = require('./db');

const Message = {};

Message.post = (conversationId, receiver, sender, message) => {
<<<<<<< HEAD
  return db('messages').insert({
    conversation_id: conversationId,
    receiver,
    sender,
    message
  });
};

<<<<<<< HEAD
Message.getByConversation = (conversationId) => {
  return db.from('messages')
    .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
    .where({ 'conversation.conversation_id': conversationId });
=======
Message.post = (bountyId, userId, message) => {
  console.log('message post db', bountyId, userId, message);
=======
>>>>>>> chat somewhat working?
  return db('messages').insert({
    conversation_id: conversationId,
    receiver,
    sender,
    message
  });
};

<<<<<<< HEAD
Message.getByBounty = (bountyId, userId) => {
  return db.from('messages').innerJoin('bounties', 'messages.bounty_id', 'bounties.bounty_id')
    .where({ 'bounties.bounty_id': bountyId })
    .andWhere({ owner_id: userId })
    .orWhere({ bounty_hunter: userId });
>>>>>>> rebase
=======
Message.getByConversation = (conversationId) => {
  return db.from('messages')
    .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
    .where({ 'conversation.conversation_id': conversationId });
>>>>>>> chat somewhat working?
};


module.exports = Message;
