/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Message from './Message';

const Messages = (props) => (
  <div>
    { props.messages.map((message) => {
      return <Message message={message} key={message} />;
    })}
  </div>
);

/*
Messages.defaultProps = {
  messages: []
};

Messages.propTypes = {
  messages: PropTypes.shape([{
    text: PropTypes.string
  }])
};
*/

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
  };
};

export default connect(mapStateToProps)(Messages);
