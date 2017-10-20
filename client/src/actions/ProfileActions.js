/* eslint-disable no-console */
import axios from 'axios';

const setProfile = (data) => {
  return {
    type: 'SET_USER_PROFILE',
    payload: data
  };
};

export const getProfile = (id) => {
  return ((dispatch) => {
    return axios.get(`/user/${id}`)
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const changeProfile = (data, profile) => {
  const newProfile = {};
  Object.entries(profile).forEach((el) => {
    const key = el[0];
    newProfile[key] = data[key] ? data[key] : profile[key];
  });
  return ((dispatch) => {
    return axios.post('/profile', newProfile)
      .then(() => {
        dispatch(getProfile(profile.username));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};


export default getProfile;
