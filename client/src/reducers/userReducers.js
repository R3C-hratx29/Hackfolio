const currentUserReducer = (state = { username: '', user_id: -1 }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      return Object.assign({}, action.user);
    }
    default: {
      return state;
    }
  }
};

const userProfileReducer = (state = { id: -1 }, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
      return Object.assign({}, action.profile);
    }
    case 'SET_USER_PROJECTS': {
      return Object.assign({}, state, action.projects);
    }
    default: {
      return state;
    }
  }
};

const helpReducer = (state = '', action) => {
  switch (action.type) {
    case 'HELP_USER': {
      return Object.assign('', action.help);
    }
    default: {
      return state;
    }
  }
};

const checkUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR_SET_USER': {
      return Object.assign('', action.check);
    }
    default: {
      return state;
    }
  }
};

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH': {
      return Object.assign([], action.results);
    }
    default: {
      return state;
    }
  }
};

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS': {
      return Object.assign([], action.notifications);
    }
    default: {
      return state;
    }
  }
};

const userReducers = {
  currentUser: currentUserReducer,
  userProfile: userProfileReducer,
  help: helpReducer,
  checkUser: checkUserReducer,
  search: searchReducer,
  notifications: notificationsReducer
};

export default userReducers;
