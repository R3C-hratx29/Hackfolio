import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { currentUserReducer, userProfileReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';

const reducers = combineReducers({
  currentUser: currentUserReducer,
  userProfile: userProfileReducer,
  modalState: modalStateReducer,
  modalPage: modalPageReducer,
  router: routerReducer
});

export default reducers;
