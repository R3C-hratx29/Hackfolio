
export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const helpReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HELP_USER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
