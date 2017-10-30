import axios from 'axios';

const setBounties = (bounties) => {
  return {
    type: 'SET_BOUNTIES',
    payload: { bounties }
  };
};

const setBountyHunters = (bountyHunters) => {
  return {
    type: 'BOUNTY_HUNTERS',
    payload: { bountyHunters }
  };
};

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    payload: { conversations }
  };
};


export const setConversation = (conversation) => {
  return {
    type: 'CONVERSATION',
    payload: { conversation }
  };
};

export const getBounties = () => {
  return (dispatch => {
    return axios.get('/api/bounty')
      .then(res => {
        dispatch(setBounties(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const postConversation = (bounty, currentUser) => {
  return ((dispatch) => {
    return axios.post('/api/converstion', {
      bounty_hunter: currentUser,
      bounty_id: bounty.bounty_id,
      bounty_title: bounty.bounty_title,
      bounty_owner: bounty.bounty_owner
    })
      .then((results) => {
        dispatch(setConversation(results.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getConversations = (bounty, isOwner, currentUser) => {
  return ((dispatch) => {
    return axios.get('/api/conversations', {
      params: { bounty: bounty.bountyId }
    })
      .then((results) => {
        if (results.data.length < 1 && !isOwner) {
          dispatch(postConversation(bounty, currentUser));
        } else {
          const bountyHunters = [];
          results.data.forEach((convo) => {
            const user = {};
            user.username = convo.username;
            user.user_id = convo.uid;
            bountyHunters.push(user);
          });
          dispatch(setBountyHunters(bountyHunters));
          dispatch(setConversations(results.data));
          dispatch(setConversation(results.data[0]));
        }
      })
      .catch((err) => {
        throw err;
      });
  });
};

export default getConversations;
