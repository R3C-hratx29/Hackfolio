/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import Hackfolio from './components/App';
import '../node_modules/grommet-css';
import reducers from './reducers/combReducers';

const store = createStore(
  reducers,
  +typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));
