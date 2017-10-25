import axios from 'axios';

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    payload: { conversations }
  };
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
