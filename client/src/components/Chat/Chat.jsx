import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Button,
  Anchor,
  Menu,
  Layer,
  Box,
  Heading
} from 'grommet';
import SendIcon from 'grommet/components/icons/base/Send';
import Messages from './Messages';
import { setConversation, getConversations } from '../../actions/BountyActions';
import '../../styles/Chat.scss';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      isOwner: false
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  componentWillMount() {
    this.props.getConversations(this.props.bounty);
  }
  componentWillReceiveProps(next) {
    if (this.props.bounty !== next.bounty) {
      next.getConversations(next.bounty);
    } else if (this.props.currentUser.user_id !== next.currentUser.user_id) {
      next.getConversations(next.bounty);
    }
    if (this.props.conversation.owner_id !== next.conversation.owner_id) {
      if (next.conversation.owner_id === next.currentUser.user_id) {
        this.setState({ isOwner: true });
      }
    }
  }
  sendMessage(e) {
    e.preventDefault();
    axios.post('/api/message', {
      text: this.state.messageText,
      sender: this.props.currentUser.username,
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
  pickConversation(user) {
    this.props.conversations.forEach((convo) => {
      if (convo.bounty_hunter === user.user_id) {
        this.props.setConversation(convo);
      }
    });
  }
  render() {
    return (
      <Layer>
        <Box
          size={{ height: 'xlarge', width: 'large' }}
          className="Chat"
          pad={{ horizantial: 'medium', vertical: 'medium', between: 'small' }}
        >
          <Box direction="row" justify="between">
            <Heading>{this.props.conversation.name}</Heading>
            <Box className="userMenu" size={{ width: 'small' }}>
              { this.state.isOwner ?
                <Menu
                  size="small"
                  label="Users"
                  colorIndex="brand"
                >
                  { this.props.bountyHunters.map((user) => {
                    return (
                      <Anchor
                        label={user.username}
                        onClick={() => this.pickConversation(user)}
                        key={user.user_id}
                      />);
                  }) }
                </Menu> : <div />
              }
            </Box>
          </Box>
          <Box
            className="messages"
            size={{ height: 'large', width: 'large' }}
          >
            <Messages id={this.props.conversation.conversation_id} />
          </Box>
          <Box
            className="messageInput"
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
        </Box>
      </Layer>
    );
  }
}

Chat.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    user_id: PropTypes.number
  }).isRequired,
  bounty: PropTypes.number.isRequired,
  bountyHunters: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.number,
    username: PropTypes.username
  })).isRequired,
  conversation: PropTypes.shape({
    conversation_id: PropTypes.number,
    username: PropTypes.string,
    owner_id: PropTypes.number,
    name: PropTypes.string,
    uid: PropTypes.number
  }).isRequired,
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  getConversations: PropTypes.func.isRequired,
  setConversation: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (id) => dispatch(getConversations(id)),
    setConversation: (convo) => dispatch(setConversation(convo))
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    bounty: 2,
    conversations: state.conversations.conversations,
    conversation: state.conversation.conversation,
    bountyHunters: state.bountyHunters.bountyHunters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
