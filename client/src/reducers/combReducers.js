import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { searchReducer, currentUserReducer, userProfileReducer, helpReducer, checkUserReducer, notificationReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';

const reducers = combineReducers({
  currentUser: currentUserReducer,
  userProfile: userProfileReducer,
  modalState: modalStateReducer,
  modalPage: modalPageReducer,
  router: routerReducer,
  help: helpReducer,
  checkUser: checkUserReducer,
  searchResults: searchReducer,
  notifications: notificationReducer,
});

export default reducers;
