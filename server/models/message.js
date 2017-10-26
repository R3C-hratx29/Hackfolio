const db = require('./db');

const Message = {};

Message.getByConversation = (conversationId) => {
  return db.from('messages')
    .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
    .where({ 'conversations.conversation_id': conversationId });
};

Message.post = (io, conversationId, receiver, sender, message) => {
  return db('messages').insert({
    conversation_id: conversationId,
    receiver,
    sender,
    message
  })
    .then(() => {
      db.from('messages')
        .innerJoin('conversations', 'messages.conversation_id', 'conversations.conversation_id')
        .where({ 'conversations.conversation_id': conversationId })
        .then((data) => {
          io.emit(`conversation:${conversationId}`, { data });
        });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = Message;
