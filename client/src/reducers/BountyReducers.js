export const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHAT_MESSAGES': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const bountyHunterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BOUNTY_HUNTER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const bountyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BOUNTY': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
