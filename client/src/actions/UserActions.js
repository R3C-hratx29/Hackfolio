/* eslint-disable no-console,no-undef */
import { push } from 'react-router-redux';
import axios from 'axios';
import modalAction from './ModalActions';

const setNotifications = (notifications) => {
  return {
    type: 'SET_NOTIFICATIONS',
    payload: { notifications }
  };
};

export const getNotifications = () => {
  return dispatch => {
    return axios
      .get('/api/notifications')
      .then(res => {
        dispatch(setNotifications(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteNotification = (id) => {
  return dispatch => {
    return axios
      .delete(`/api/notifications/${id}`)
      .then(() => {
        dispatch(getNotifications());
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteAllNotifications = () => {
  return dispatch => {
    return axios
      .delete('/api/notifications')
      .then(() => {
        dispatch(getNotifications());
      })
      .catch(err => {
        console.log(err);
      });
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
    return axios.post('/api/login', {
      username: userdata.username,
      password: userdata.password
    })
      .then((res) => {
        dispatch(clearError());
        dispatch(setUser(res.headers));
        dispatch(getNotifications());
        dispatch(push(`/user/${res.headers.username}`));
        dispatch(modalAction('close'));
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err.response.data));
      });
  });
};

export const githubSignup = userdata => {
  return dispatch => {
    return axios
      .get('https://github.com/login/oauth/authorize', {
        params: {
          client_id: '3b114f5afe920bd6f722'
        }
      })
      .then(res => {
        dispatch(clearError());
        console.log(res, userdata);
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(err.response.data));
      });
  };
};

export const signup = userdata => {
  return dispatch => {
    return axios
      .post('/api/signup', {
        username: userdata.username,
        password: userdata.password,
        email: userdata.email,
      })
      .then(res => {
        dispatch(clearError());
        dispatch(setUser(res.headers));
        dispatch(getNotifications());
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
      .get('/api/logout')
      .then(() => {
        dispatch(setUser({ username: undefined, jwt: undefined }));
        dispatch(push('/LandingPage'));
      })
      .catch(err => {
        throw err;
      });
  };
};

const sendSearch = (results) => {
  return {
    type: 'SET_SEARCH',
    payload: { results }
  };
};

export const search = (text) => {
  return dispatch => {
    return axios.put('/api/search', { text })
      .then((res) => {
        dispatch(sendSearch(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
