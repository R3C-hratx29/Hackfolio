/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/combReducers';
import { history } from '../components/App';

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  +typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...[thunkMiddleware, middleware])
);

export default store;
