import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { searchReducer, currentUserReducer, userProfileReducer, helpReducer, checkUserReducer, notificationReducer } from './userReducers';
import { modalStateReducer, modalPageReducer } from './modalReducers';
import { conversationReducer, conversationsReducer, bountiesReducer, bountyReducer, bountyHunterReducer } from './BountyReducers';

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
  bounties: bountiesReducer, 
  bounty: bountyReducer,
  bountyHunters: bountyHunterReducer,
  conversations: conversationsReducer,
  conversation: conversationReducer
});

export default reducers;
