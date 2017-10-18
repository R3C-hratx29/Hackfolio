/* eslint-disable no-console */
import axios from 'axios';

export const setUser = (data) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user: data
    }
  };
};

export const login = (userdata) => {
  console.log('login', userdata);
  return ((dispatch) => {
    return axios.post('/login', {
      username: userdata.username,
      password: userdata.password
    })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        throw err;
      });
  });
};

export const signup = (userdata) => {
  console.log('signup', userdata);
  return (dispatch) => {
    return axios.post('/signup', {
      username: userdata.username,
      password: userdata.password,
      email: userdata.email
    })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const logout = () => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user: null
    }
  };
};

export const search = () => {
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
