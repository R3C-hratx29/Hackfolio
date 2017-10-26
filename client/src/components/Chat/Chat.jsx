import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Form,
  FormField,
  TextInput,
  Button,
  Menu
} from 'grommet';
import SendIcon from 'grommet/components/icons/base/Send';
import UserIcon from 'grommet/components/icons/base/User';
import Messages from './Messages';
import getConversations from '../../actions/BountyActions';

const hasChanged = (cono1, cono2) => {
  let ret = false;
  if (cono1 === undefined) {
    if (cono2 !== undefined) {
      return true;
    }
    if (cono1.length !== cono2.length) {
      return true;
    }
  }
  cono1.forEach((el, i) => {
    Object.entries(el).forEach((key) => {
      if (key[1] !== cono2[i][key[0]]) {
        ret = true;
      }
    });
  });
  return ret;
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      isOwner: false,
      bountyHunters: [],
      conversation: { conversation_id: -1 }
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser === undefined && nextProps.currentUser !== undefined) {
      nextProps.getConversations(this.props.bounty); // need to change to real bounties
    } else if (this.props.currentUser.user_id !== nextProps.currentUser.user_id) {
      nextProps.getConversations(this.props.bounty); // need to change to real bounties
    }

    if (nextProps.conversations && hasChanged(this.props.conversations, nextProps.conversations)) {
      const isOwner = nextProps.conversations[0].owner_id === nextProps.currentUser.user_id;
      const bountyHunters = [];
      if (isOwner) {
        nextProps.conversations.forEach((el) => {
          const user = {};
          user.username = el.username;
          user.user_id = el.uid;
          bountyHunters.push(user);
        });
        this.setState({ isOwner, bountyHunters });
      } else {
        this.setState({ conversation: nextProps.conversations[0] });
      }
    }
  }
  sendMessage(e) {
    e.preventDefault();
    axios.post('/api/message', {
      text: this.state.messageText,
      sender: this.props.currentUser.username,
      receiver: this.state.conversation.username,
      conversationId: this.state.conversation.conversation_id
    })
      .then(() => {
        console.log('send mess :D');
      })
      .catch((err) => {
        console.log('send message failed', err);
      });
  }
  textHandler(e) {
    this.setState({ messageText: e.target.value });
  }
  pickConversation(user) {
    this.props.conversations.forEach((convo) => {
      if (convo.bounty_hunter === user.user_id) {
        this.setState({ conversation: convo });
      }
    });
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.sendMessage} >
          <FormField label="Message">
            <TextInput
              onDOMChange={this.textHandler}
              value={this.state.messageText}
            />
          </FormField>
          <Button
            icon={<SendIcon />}
            label="send"
            type="submit"
          />
        </Form>

        <div>
          { this.state.isOwner ?
            <Menu
              responsive
              label="Users"
              icon={<UserIcon />}
            >
              { this.state.bountyHunters.map((user) => {
                return (
                  <Button
                    label={user.username}
                    onClick={() => this.pickConversation(user)}
                    key={user.user_id}
                  />);
              }) }
            </Menu> : <div />
          }
        </div>
        <div>
          <Messages id={this.state.conversation.conversation_id} />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    user_id: PropTypes.number
  }).isRequired,
  bounty: PropTypes.number.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({
    conversations_id: PropTypes.number,
    owner_id: PropTypes.number
  })).isRequired,
  getConversations: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (id) => dispatch(getConversations(id))
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    bounty: 1,
    conversations: state.conversations.conversations
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

