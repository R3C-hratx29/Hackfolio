/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import ReactDOM from 'react-dom';
import Hackfolio, { history } from './components/App';
import '../node_modules/grommet-css';
import reducers from './reducers/combReducers';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  +typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware)
);

store.dispatch({ type: 'SET_CURRENT_USER', payload: { user: null } });

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));

