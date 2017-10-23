import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => (
  <div>
    { props.message.text }
  </div>
);

Message.defaultProps = {
  message: 'nothing here yet'
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string
  })
};

export default Message;
