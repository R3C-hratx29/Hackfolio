/* eslint-disable no-restricted-syntax,prefer-template,guard-for-in,no-undef,no-console */
import axios from 'axios';

const setProfile = (data) => {
  return {
    type: 'SET_USER_PROFILE',
    payload: data
  };
};

export const getProfile = (id) => {
  // get data from database
  return ((dispatch) => {
    return axios.get('/user/' + id)
      .then((res) => {
        console.log('res in getProfile', res);
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const changeProfile = (data, profile) => {
  const newProfile = {};
  for (const key in profile) {
    newProfile[key] = data[key] ? data[key] : profile[key];
  }
  const config = {
    headers: {
      jwt: window.localStorage.token
    }
  };
  return ((dispatch) => {
    return axios.post('/profile', newProfile, config)
      .then((res) => {
        dispatch(getProfile(res.headers.username));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const changeProjects = (projects) => {
  return {
    type: 'SET_USER_PROJECTS',
    payload: projects
  };
};

export default getProfile;
