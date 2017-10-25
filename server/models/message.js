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

Message.getByConversation = (conversationId) => {
  return db.from('messages')
    .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
    .where({ 'conversation.conversation_id': conversationId });
};


module.exports = Message;
