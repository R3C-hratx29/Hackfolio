import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Timestamp } from 'grommet';
import '../../styles/Message.scss';

const Message = (props) => (
  <div className="Message">
    <div className={`time ${props.message.sender === props.currentUser ? 'sender' : 'reciever'}`} >
      <Timestamp value={props.message.created_at} />
    </div>
    <div className={`Main ${props.message.sender === props.currentUser ? 'Sender' : 'Reciever'}`}>
      <div className="message">
        { props.message.message }
      </div>
      <div className="name">
        — { props.message.sender }
      </div>
    </div>
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
    sender: PropTypes.string,
    created_at: PropTypes.string
  }),
  currentUser: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.username
  };
};

export default connect(mapStateToProps)(Message);
