/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Hackfolio from './components/App';
import '../node_modules/grommet-css';
import store from './store';

axios.get('/me', {
  headers: {
    jwt: window.localStorage.token
  }
})
  .then((res) => {
    console.log(res);
    store.dispatch({ type: 'SET_CURRENT_USER', payload: { user: { username: res.headers.username, jwt: window.localStorage.token } } });
  })
  .catch((err) => {
    throw err;
  });

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));
