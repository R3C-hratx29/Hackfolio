import axios from 'axios';

const setMessages = (messages) => {
  return {
    type: 'CHAT_MESSAGES',
    payload: { messages }
  };
};

export const getMessages = (bountyId) => {
  console.log('action', bountyId);
  return ((dispatch) => {
    return axios.get(`/api/messagesByBounty/${bountyId}`)
      .then((results) => {
        dispatch(setMessages(results));
      })
      .catch((err) => {
        console.log(err);
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
