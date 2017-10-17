import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { currentUserReducer, userProfileReducer, helpReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';

const reducers = combineReducers({
  currentUser: currentUserReducer,
  userProfile: userProfileReducer,
  modalState: modalStateReducer,
  modalPage: modalPageReducer,
  router: routerReducer,
  help: helpReducer
});

export default reducers;
