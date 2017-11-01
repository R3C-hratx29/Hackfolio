/* eslint-disable no-console */
import axios from 'axios';

const setProfile = (data) => {
  if (data.length < 1) {
    return {
      type: 'SET_USER_PROFILE',
      profile: { id: -1 }
    };
  }
  return {
    type: 'SET_USER_PROFILE',
    profile: data
  };
};

export const getProfile = (id) => {
  return ((dispatch) => {
    return axios.get(`/api/user/${id}`)
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
  console.log(newProfile);
  return ((dispatch) => {
    return axios.post('/api/profile', newProfile)
      .then(() => {
        dispatch(getProfile(profile.username));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};


export default getProfile;
