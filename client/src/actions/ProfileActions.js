/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import exampleData from './../data/example-data';

const setProfile = (data) => {
  console.log('set Profile', data);
  return {
    type: 'SET_USER_PROFILE',
    payload: data
  };
};

export const getProfile = (id) => {
  // get data from database
  return ((dispatch) => {
    return axios.get('/Profile', { id })
      .then((res) => {
        console.log('res in getProfile', res);
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        throw err;
      });
  });
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
