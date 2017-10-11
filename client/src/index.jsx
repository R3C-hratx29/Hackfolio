/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import './index.scss';
import Hackfolio from './App';

const initialState = (state = [], action) => {
  switch (action.type) {
    case 'TEST_REDUX':
      return [...state, action.payload];
    default:
      return state;
  }
};
const reducers = combineReducers({ initialState: initialState });

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  +typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch({ type: 'TEST_REDUX', payload: { initialState: 1 } });

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));
