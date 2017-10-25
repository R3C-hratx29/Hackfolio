/* eslint-disable no-undef,no-console */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Hackfolio from './components/App';
import '../node_modules/grommet-css';
import store from './store';

<<<<<<< HEAD
<<<<<<< HEAD
=======
if (window.localStorage.token) {
  axios.defaults.headers.common.jwt = window.localStorage.token;
}

if (window.localStorage.token) {
  axios
    .get('/api/me')
    .then(res => {
      store.dispatch({
        type: 'SET_CURRENT_USER',
        payload: { user: { username: res.headers.username, jwt: window.localStorage.token } },
      });
    })
    .catch(err => {
      console.log(err);
    });
}

store.dispatch({ type: 'ERROR_SET_USER', payload: { error: 'start' } });
store.dispatch({ type: 'SET_SEARCH', payload: { results: [] } });

store.dispatch({
  type: 'CHAT_MESSAGES',
  payload: {
    messages:
    [
      { text: 'hi' },
      { text: 'blah' },
      { text: 'something' }
    ]
  }
});

store.dispatch({
  type: 'BOUNTY',
  payload: {
    bounty: {
      bounty_id: 1,
      title: 'test',
      owner: 1
    }
  }
});

store.dispatch({
  type: 'BOUNTY_HUNTER',
  payload: {
    bounty_hunter: {
      id: 2,
      username: 'notbob'
    }
  }
});

>>>>>>> rebase
=======
>>>>>>> chat somewhat working?
ReactDOM.render(
  <Provider store={store}>
    <Hackfolio store={store} />
  </Provider>,
  document.getElementById('root'),
);
