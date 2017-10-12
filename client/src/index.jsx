/* eslint-disable no-undef, no-underscore-dangle, object-shorthand */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import Hackfolio from './App';
import '../node_modules/grommet-css';

const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  currentUser: currentUserReducer,
  userProfile: userProfileReducer
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  +typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render((
  <Provider store={store}>
    <Hackfolio />
  </Provider>), document.getElementById('root'));
