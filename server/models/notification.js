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

Notification.deleteNotification = (id) => {
  return db('notifications').where({ id })
    .del()
    .catch(err => {
      console.error(err);
    });
};

module.exports = Notification;
