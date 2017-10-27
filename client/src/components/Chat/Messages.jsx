import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box } from 'grommet';
import socket from '../../socket';
import Message from './Message';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillReceiveProps(next) {
    if (next.id > 0 && next.id !== this.props.id) {
      socket.removeListener(`conversations:${this.props.id}`);
      socket.on(`conversation:${next.id}`, (data) => {
        this.setState({ messages: data.data });
      });
      axios.get('/api/messages', {
        params: { conversationId: next.id }
      })
        .then((results) => {
          this.setState({ messages: results.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <Box>
        { this.state.messages.map((message) => {
          return <Message message={message} key={message.message_id} />;
        })}
      </Box>
    );
  }
}
Messages.defaultProps = {
  id: -1
};


Messages.propTypes = {
  id: PropTypes.number
};

export default Messages;
