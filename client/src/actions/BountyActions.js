import axios from 'axios';

export const setFavorite = (bountyIds) => {
  const fave = [];
  bountyIds.forEach((el) => {
    fave.push(el.bounty_id);
  });
  return {
    type: 'SET_FAVORITE',
    favorites: fave
  };
};

export const setBounty = (bounty) => {
  return {
    type: 'SET_BOUNTY',
    bounty
  };
};

const setBounties = (bounties) => {
  return {
    type: 'SET_BOUNTIES',
    bounties
  };
};

const setConversations = (conversations) => {
  return {
    type: 'CONVERSATIONS',
    conversations
  };
};

export const setConversation = (conversation) => {
  return {
    type: 'CONVERSATION',
    conversation
  };
};

export const getBounty = (id) => {
  return (dispatch => {
    return axios.get('/api/bountyById', {
      params: { id }
    })
      .then(res => {
        dispatch(setBounty(res.data));
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};

export const getBounties = () => {
  return (dispatch => {
    return axios.get('/api/bounty')
      .then(res => {
        dispatch(setBounties(res.data));
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};

export const postBounty = (bounty) => {
    return ((dispatch) => {
        return axios.post('/api/bounty', bounty)
            .then(res => {
                dispatch(getBounties(res.data));
            })
            .catch(err => {
                console.log(err); // eslint-disable-line no-console
            });
    });
};

const postConversation = (bounty) => {
  return ((dispatch) => {
    return axios.post('/api/converstion', {
      bountyId: bounty.bounty_id,
      title: bounty.titlei,
      ownerId: bounty.owner_id
    })
      .then((results) => {
        dispatch(setConversation(results.data[0]));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};

export const getConversations = (bounty, isOwner) => {
  return ((dispatch) => {
    return axios.get('/api/conversations', {
      params: { bountyId: bounty.bounty_id }
    })
      .then((results) => {
        if (results.data.length < 1 && isOwner === 'false') {
          dispatch(postConversation(bounty));
        } else if (results.data.length < 1) {
          dispatch(setConversations([{ conversation_id: -1, owner_id: -1, name: 'No conversations yet' }]));
          dispatch(setConversation({ conversation_id: -1, owner_id: -1, name: 'No conversations yet' }));
        } else {
          dispatch(setConversations(results.data));
          dispatch(setConversation(results.data[0]));
        }
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};


export const changeFavorite = (bountyId, isFave) => {
  if (isFave) {
    return ((dispatch) => {
      return axios.delete('/api/favorite', { params: { bounty_id: bountyId } })
        .then((results) => {
          dispatch(setFavorite(results.data));
        })
        .catch(err => {
          console.log(err); // eslint-disable-line no-console
        });
    });
  }
  return ((dispatch) => {
    return axios.post('/api/favorite', { bounty_id: bountyId })
      .then((results) => {
        dispatch(setFavorite(results.data));
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};

export const getFavorites = () => {
  return ((dispatch) => {
    return axios.get('/api/favorite')
      .then((results) => {
        dispatch(setFavorite(results.data));
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};

export const resetChat = (id) => {
  return (dispatch => {
    return axios.get('/api/bountyById', { params: { id } })
      .then(res => {
        dispatch(setBounty(res.data));
        dispatch(getConversations(res.data, res.headers.is_owner));
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line no-console
      });
  });
};
