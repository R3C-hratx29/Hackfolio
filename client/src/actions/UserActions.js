/* eslint-disable no-console,no-undef */
import { push } from 'react-router-redux';
import axios from 'axios';
import modalAction from './ModalActions';

export const help = (state) => {
  return {
    type: 'HELP_USER',
    payload: {
      text: state
    }
  };
};

export const clearError = () => {
  return {
    type: 'ERROR_SET_USER',
    payload: { error: '' }
  };
};

export const setError = (err) => {
  let error = '';
  if (err === 'User does not exist.') {
    error = 'user';
  } else if (err === 'Incorrect password') {
    error = 'password';
  } else if (err === 'Please fill out all forms.') {
    error = 'form';
  } else if (err === 'User already exists.') {
    error = 'user';
  } else if (err === 'Email already exists.') {
    error = 'email';
  }
  return {
    type: 'ERROR_SET_USER',
    payload: { error }
  };
};

export const setUser = data => {
  console.log(data.jwt);
  if (data.jwt === undefined) {
    window.localStorage.removeItem('token');
    axios.defaults.headers.common.jwt = null;
  } else {
    window.localStorage.token = data.jwt;
    axios.defaults.headers.common.jwt = data.jwt;
  }
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      user: {
        username: data.username,
        jwt: data.jwt,
      },
    },
  };
};

export const login = (userdata) => {
  return ((dispatch) => {
    return axios.post('/login', {
      username: userdata.username,
      password: userdata.password
    })
      .then((res) => {
        dispatch(clearError());
        dispatch(setUser(res.headers));
        dispatch(push(`/user/${res.headers.username}`));
        dispatch(modalAction('close'));
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err.response.data));
      });
  };
};

export const signup = userdata => {
  console.log('signup', userdata);
  return dispatch => {
    return axios
      .post('/signup', {
        username: userdata.username,
        password: userdata.password,
        email: userdata.email,
      })
      .then(res => {
        dispatch(setUser(res.headers));
        dispatch(push(`/user/${res.headers.username}`));
        dispatch(modalAction('close'));
        dispatch(help('Profile'));
      })

      .catch((err) => {
        console.log(err);
        dispatch(setError(err.response.data));
      });
  };
};

export const logout = () => {
  return dispatch => {
    return axios
      .get('/logout')
      .then(() => {
        dispatch(setUser({ username: undefined, jwt: undefined }));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const search = () => {
  return {
    type: 'SET_USER_PROFILE',
    payload: {
      text: 'some user goes here',
    },
  };
};

export const help = state => {
  return {
    type: 'HELP_USER',
    payload: {
      text: state,
    },
  };
};
