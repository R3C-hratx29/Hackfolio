/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

const Github = (props) => {
  if (props.match.params.token) {
    window.localStorage.token = props.match.params.token;
    window.location.href = `/user/${props.match.params.username}`;
  }
  return null;
};

export default Github;
