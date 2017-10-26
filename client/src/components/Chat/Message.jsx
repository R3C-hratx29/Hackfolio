import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = (props) => (
  <div>
    { props.message.message }
    <br />
    -- from { props.message.sender }
    <br />
  </div>
);

Message.defaultProps = {
  message: {
    message: 'nothing here yet',
    sender: 'The Internet'
  }
};

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    sender: PropTypes.string
  }),
  // currentUser: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user.username
  };
};

export default connect(mapStateToProps)(Message);
