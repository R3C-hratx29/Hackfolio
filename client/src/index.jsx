/* eslint-disable no-undef,no-console */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Hackfolio from './components/App';
import '../node_modules/grommet-css';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Hackfolio store={store} />
  </Provider>,
  document.getElementById('root'),
);
