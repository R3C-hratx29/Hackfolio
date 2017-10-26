const db = require('./db');

const Notification = {};

Notification.findByUserId = (userId) => {
  return db('notifications').where({ user_id: userId }).select('*')
    .then(notifications => {
      return notifications;
    })
    .catch(err => {
      console.error(err);
    });
};

Notification.deleteNotification = (dLoad, id) => {
  return db('notifications').where({ id, user_id: dLoad.user_id })
    .del()
    .catch(err => {
      console.error(err);
    });
};

Notification.deleteAllNotifications = (dLoad) => {
  return db('notifications').where({ user_id: dLoad.user_id })
    .del()
    .catch(err => {
      console.error(err);
    });
};

Notification.createNotification = (io, data) => {
  return db('notifications').insert({
    user_id: data.user_id,
    bounty_id: data.bounty_id,
    message: data.message,
  })
    .then(() => {
      io.emit(`notification:${data.username}`, {
        message: data.message
      });
      // return db('notifications').where({ user_id: data.user_id }).select('*');
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Notification;
