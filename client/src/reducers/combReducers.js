import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { searchReducer, currentUserReducer, userProfileReducer, helpReducer, checkUserReducer, notificationReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';
import { bountyHunterReducer, messagesReducer, bountyReducer } from './BountyReducers';

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
  bountyHunter: bountyHunterReducer,
  messages: messagesReducer,
  bounty: bountyReducer
});

export default reducers;
