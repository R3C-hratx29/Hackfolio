import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';
import { Box } from 'grommet';
import socket from '../../socket';
import Message from './Message';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.getMessages = this.getMessages.bind(this);
    this.setupSocket = this.setupSocket.bind(this);
  }
  componentDidMount() {
    if (this.props.id > 0) {
      this.getMessages(this.props.id);
      this.setupSocket(this.props.id);
    }
  }
  componentWillReceiveProps(next) {
    if (next.id > 0 && next.id !== this.props.id) {
      const ref = this.messagesRef.boxContainerRef;
      if (this.props.id > 0) {
        socket.removeListener(`conversations:${this.props.id}`);
      }
      this.setupSocket(next.id);
      axios.get('/api/messages', {
        params: { conversationId: next.id }
      })
        .then((results) => {
          this.setState({ messages: results.data });
          $(ref).parent()[0].scrollTop = ref.scrollHeight;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (next.id < 1) {
      this.setState({ messages: [] });
    }
  }
  setupSocket(id) {
    const ref = this.messagesRef.boxContainerRef;
    if (id > 0) {
      socket.on(`conversation:${id}`, (data) => {
        this.setState({ messages: data.data });
        $(ref).parent().animate({ scrollTop: ref.scrollHeight });
      });
    }
  }
  getMessages(id) {
    if (id < 1) {
      this.setState({ messages: [] });
    } else {
      axios.get('/api/messages', {
        params: { conversationId: id }
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
      <Box ref={ref => { this.messagesRef = ref; }}>
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
