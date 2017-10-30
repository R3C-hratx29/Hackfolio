import axios from 'axios';

export const setBounty = (bounty) => {
  return {
    type: 'SET_BOUNTY',
    payload: { bounty }
  };
};

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

const postConversation = (bounty) => {
  return ((dispatch) => {
    return axios.post('/api/converstion', {
      bountyId: bounty.bounty_id,
      title: bounty.title,
      ownerId: bounty.owner_id
    })
      .then((results) => {
        dispatch(setConversation(results.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getConversations = (bounty, isOwner) => {
  console.log(bounty, 'in get');
  return ((dispatch) => {
    return axios.get('/api/conversations', {
      params: { bountyId: bounty.bounty_id }
    })
      .then((results) => {
        if (results.data.length < 1 && !isOwner) {
          dispatch(postConversation(bounty));
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
