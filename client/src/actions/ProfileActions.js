/* eslint-disable no-restricted-syntax */
import { push } from 'react-router-redux';
import exampleData from './../data/example-data';

const getProfile = (id) => {
  // get data from database
  if (id === 'randomperson') {
    return push('/LandingPage');
  }
  return {
    type: 'SET_USER_PROFILE',
    payload: exampleData.profileOfOtherUser
  };
};

export const changeProfile = (data) => {
  for (const key in exampleData.profileOfOtherUser) {
    if (data[key]) {
      exampleData.profileOfOtherUser[key] = data[key];
    }
  }
  return {
    type: 'SET_USER_PROFILE',
    payload: exampleData.profileOfOtherUser
  };
};

export const changeProjects = (projects) => {
  return {
    type: 'SET_USER_PROJECTS',
    payload: projects
  };
};

export default getProfile;
