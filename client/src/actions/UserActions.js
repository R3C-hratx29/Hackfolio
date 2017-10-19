/* eslint-disable no-console,no-undef */
import axios from 'axios';

export const setUser = (data) => {
  console.log(data.jwt);
  if (data.jwt === undefined) {
    window.localStorage.removeItem('token');
  } else {
    window.localStorage.token = data.jwt;
  }
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user: {
        username: data.username,
        jwt: data.jwt
      }
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
        dispatch(setUser(res.headers));
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
        dispatch(setUser(res.headers));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return axios.get('/logout')
      .then(() => {
        dispatch(setUser({ username: undefined, jwt: undefined }));
      })
      .catch((err) => {
        throw err;
      });
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
