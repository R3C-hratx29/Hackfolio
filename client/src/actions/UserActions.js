/* eslint-disable no-console */
// import axios from 'axios';

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
  /* axios.post('/signup', {
    params: {
      username: userdata.username,
      password: userdata.password,
      email: userdata.email
    }
  })
  .then(  ) */
  return {
    type: 'SET_CURRENT_USER',
    userdata
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

export const search = (string) => {
  console.log('search', string);
  return {
    type: 'SET_USER_PROFILE',
    payload: {
      text: 'some user goes here'
    }
  };
};

export const help = (state) => {
  return {
    type: 'HELP_USER',
    payload: {
      text: state
    }
  };
};
