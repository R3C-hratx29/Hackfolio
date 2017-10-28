import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Box } from 'grommet';
import SendIcon from 'grommet/components/icons/base/Send';
import '../../styles/InputMessage.scss';

class InputMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  sendMessage(e) {
    e.preventDefault();
    axios.post('/api/message', {
      text: this.state.messageText,
      sender: this.props.currentUser,
      receiver: this.props.conversation.username,
      receiverId: this.props.conversation.uid,
      conversationId: this.props.conversation.conversation_id,
      name: this.props.conversation.name
    })
      .then(() => {
        console.log('send mess :D');
      })
      .catch((err) => {
        console.log('send message failed', err);
      });
    this.setState({ messageText: '' });
  }
  textHandler(e) {
    this.setState({ messageText: e.target.value });
  }
  render() {
    return (
      <Box
        className="InputMessage"
        pad={{ between: 'small' }}
        direction="row"
      >
        <Box flex="grow" style={{ margin: 0 }}>
          <textarea
            className="textarea"
            onChange={this.textHandler}
            value={this.state.messageText}
          />
        </Box>
        <Button
          className="sendBtn"
          icon={<SendIcon />}
          label="send"
          primary
          onClick={this.sendMessage}
        />
      </Box>
    );
  }
}

InputMessage.propTypes = {
  currentUser: PropTypes.string.isRequired,
  conversation: PropTypes.shape({
    conversation_id: PropTypes.number,
    username: PropTypes.string,
    name: PropTypes.string,
    uid: PropTypes.number
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user.username,
    conversation: state.conversation.conversation,
  };
};

export default connect(mapStateToProps)(InputMessage);
