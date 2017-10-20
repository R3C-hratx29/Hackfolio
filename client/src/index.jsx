/* eslint-disable no-undef,no-console */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Hackfolio from './components/App';
import '../node_modules/grommet-css';
import store from './store';


axios.defaults.headers.common.jwt = window.localStorage.token;

axios.get('/me')
  .then((res) => {
    console.log(res);
    store.dispatch({ type: 'SET_CURRENT_USER', payload: { user: { username: res.headers.username, jwt: window.localStorage.token } } });
  })
  .catch((err) => {
    console.log(err);
  });

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));
