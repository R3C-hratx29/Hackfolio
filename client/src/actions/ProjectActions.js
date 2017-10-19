/* eslint-disable no-undef */
import axios from 'axios';
import { getProfile } from './ProfileActions';

export const saveProject = (project) => {
  return ((dispatch) => {
    return axios.post('/project', project, {
      headers: { jwt: window.localStorage.token }
    })
      .then((res) => {
        dispatch(getProfile(res.headers.username));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const changeProjects = (projects) => {
  return ((dispatch) => {
    return axios.put('/project', projects, {
      headers: { jwt: window.localStorage.token }
    })
      .then((res) => {
        console.log('headers in change', res.headers);
        dispatch(getProfile(res.headers.username));
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
