
export const currentUserReducer = (state = { user: { username: '', user_id: -1 } }, action) => {
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
    case 'SET_USER_PROJECTS': {
      return Object.assign({}, state, {
        projects: action.payload
      });
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

export const checkUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ERROR_SET_USER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCH': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const notificationReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const otherUserReducer = (state = { user: { user_id: 1, username: '' } }, action) => {
  switch (action.type) {
    case 'OTHER_USER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
