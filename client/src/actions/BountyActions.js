import axios from 'axios';

const setMessages = (messages) => {
  return {
    type: 'CHAT_MESSAGES',
    payload: { messages }
  };
};

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    payload: { conversations }
  };
};

export const getMessages = (bountyId) => {
  return ((dispatch) => {
<<<<<<< HEAD
<<<<<<< HEAD
    return axios.get('/api/messagesByBounty', {
      params: { bountyId }
    })
=======
    return axios.get(`/api/messagesByBounty/${bountyId}`)
>>>>>>> rebase
=======
    return axios.get('/api/messagesByBounty', {
      params: { bountyId }
    })
>>>>>>> chat somewhat working?
      .then((results) => {
        dispatch(setMessages(results.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getConversations = (bountyId) => {
  return ((dispatch) => {
    return axios.get('/api/conversations', {
      params: { bountyId }
    })
      .then((results) => {
        dispatch(setConversations(results.data));
      })
      .catch((err) => {
        throw err;
      });
  });
};

export const setBountyHunter = (user) => {
  return {
    type: 'BOUNTY_HUNTER',
    payload: {
      user_id: user.id,
      username: user.username
    }
  };
};

// get bounty - here it checks to see if user is bounty hunter and then sets it type: (BOUNTY)
