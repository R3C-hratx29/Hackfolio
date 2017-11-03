/* eslint-disable no-console,no-undef */
import { push } from 'react-router-redux';
import axios from 'axios';

const setNotifications = (notifications) => {
  return {
    type: 'SET_NOTIFICATIONS',
    notifications
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

export const endError = () => {
  return {
    type: 'ERROR_SET_USER',
    error: 'end'
  };
};

export const startError = () => {
  return {
    type: 'ERROR_SET_USER',
    error: 'start'
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
    error
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
    user: {
      username: data.username,
      user_id: parseInt(data.user_id, 10),
      jwt: data.jwt
    }
  };
};

export const login = (userdata) => {
  return ((dispatch) => {
    return axios.post('/api/login', {
      username: userdata.username,
      password: userdata.password
    })
      .then((res) => {
        dispatch(endError());
        dispatch(setUser(res.headers));
        dispatch(getNotifications());
        dispatch(push(`/user/${res.headers.username}`));
      })
      .catch(err => {
        dispatch(setError(err.response.data));
      });
  });
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
        dispatch(endError());
        dispatch(setUser(res.headers));
        dispatch(getNotifications());
        dispatch(push(`/user/${res.headers.username}`));
      })
      .catch((err) => {
        dispatch(setError(err.response.data));
      });
  };
};

export const logout = () => {
  return dispatch => {
    return axios
      .get('/api/logout')
      .then(() => {
        dispatch(startError());
        dispatch(setUser({ username: '', user_id: -1, jwt: undefined }));
        dispatch(push('/'));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const sendSearch = (results) => {
  return {
    type: 'SET_SEARCH',
    results
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
