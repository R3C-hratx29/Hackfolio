
export const bountyHunterReducer = (state = { bounty_hunter: { username: 'notbob', id: 19 } }, action) => {
  switch (action.type) {
    case 'BOUNTY_HUNTER': {
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

export const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case 'CONVERSATIONS': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
