/* eslint-disable no-console */
export const login = (userdata) => {
  console.log('login', userdata);
  // do stuff
  return {
    type: 'SET_CURRENT_USER',
    userdata
  };
};

export const signup = (userdata) => {
  console.log('signup', userdata);
  // do stuff
  return {
    type: 'SET_CURRENT_USER',
    userdata
  };
};

export const search = (string) => {
  console.log('search', string);
  return {
    type: 'SET_USER_PROFILE',
    payload: {
      text: 'some user goes here'
    }
  };
};

export const logout = () => {
  console.log('logged out');
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user: null
    }
  };
};
