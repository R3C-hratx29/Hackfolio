import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducers from './userReducers';
import bountyReducers from './BountyReducers';

const allReducers = Object.assign(
  {},
  userReducers,
  bountyReducers,
  { router: routerReducer }
);
const reducers = combineReducers(allReducers);

export default reducers;
