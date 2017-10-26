import axios from 'axios';

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    payload: { conversations }
  };
};

const getConversations = (bountyId) => {
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

export default getConversations;
