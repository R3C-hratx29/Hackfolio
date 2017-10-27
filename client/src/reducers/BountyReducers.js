
export const bountyHunterReducer = (state = { bountyHunters: [] }, action) => {
  switch (action.type) {
    case 'BOUNTY_HUNTERS': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const bountyReducer = (state = { bounty: { bounty_id: -1 } }, action) => {
  switch (action.type) {
    case 'BOUNTY': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const conversationsReducer = (state = { conversations: [] }, action) => {
  switch (action.type) {
    case 'CONVERSATIONS': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const conversationReducer = (state = { conversation: { conversation_id: -1 } }, action) => {
  switch (action.type) {
    case 'CONVERSATION': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
