import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => (
  <div>
    { props.message.message }
  </div>
);

Message.defaultProps = {
  message: 'nothing here yet'
};

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string
  })
};

export default Message;
