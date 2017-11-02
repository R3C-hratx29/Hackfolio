
const bountyReducer = (state = { bounty_id: -1 }, action) => {
  switch (action.type) {
    case 'SET_BOUNTY': {
      return Object.assign({}, action.bounty);
    }
    default: {
      return state;
    }
  }
};

const bountiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOUNTIES': {
      return Object.assign([], action.bounties);
    }
    default: {
      return state;
    }
  }
};

const conversationsReducer = (state = [{ conversation_id: -1, owner_id: -1, name: 'No conversations yet' }], action) => {
  switch (action.type) {
    case 'CONVERSATIONS': {
      return Object.assign([], action.conversations);
    }
    default: {
      return state;
    }
  }
};

const conversationReducer = (state = { conversation_id: -1, owner_id: -1, name: 'No conversations yet' }, action) => {
  switch (action.type) {
    case 'CONVERSATION': {
      return Object.assign({}, action.conversation);
    }
    default: {
      return state;
    }
  }
};

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITE': {
      return Object.assign([], action.favorites);
    }
    default: {
      return state;
    }
  }
};

const bountyReducers = {
  bounty: bountyReducer,
  bounties: bountiesReducer,
  conversations: conversationsReducer,
  conversation: conversationReducer,
  favorites: favoritesReducer
};

export default bountyReducers;
