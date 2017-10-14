import { push } from 'react-router-redux';
import exampleData from './../data/example-data';

const getProfile = (id) => {
  // get data from database
  // if no user redirect??
  if (id === 'randomperson') {
    return push('/LandingPage');
  }
  return {
    type: 'SET_USER_PROFILE',
    payload: exampleData.profileOfOtherUser,
  };
};

export default getProfile;
