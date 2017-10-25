/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import { getConversations } from '../actions/BountyActions';
import { setOtherUser } from '../actions/UserActions';

const hasChanged = function (cono1, cono2) {
  let ret = false;
  if (cono1 === undefined) {
    if (cono2 !== undefined) {
      return true;
    }
    if (cono1.length !== cono2.lenght) {
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
      conversation: {conversation_id: -1}
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser === undefined && nextProps.currentUser !== undefined) {
      nextProps.getConversations(4); // need to change to real bounties
    } else if (this.props.currentUser.user_id !== nextProps.currentUser.user_id) {
      nextProps.getConversations(4); // need to change to real bounties
    }

    if (hasChanged(this.props.conversations, nextProps.conversations)) {
      const isOwner = nextProps.conversations[0].owner_id === nextProps.currentUser.user_id;
      const bountyHunters = [];
      if (isOwner) {
        nextProps.conversations.forEach((el) => {
          const user = {};
          user.username = el.username;
          user.user_id = el.uid;
          bountyHunters.push(user);
        });
        console.log(bountyHunters);
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
      receiver: this.state.conversations.username,
      conversationId: this.state.conversation.conversation_id
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
        console.log(convo);
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
                  return <Button label={user.username} onClick={() => this.pickConversation(user)} key={user.user_id} />;
              }) }
            </Menu> : <div />
          }
        </div>
        <div>
          <Messages id={this.state.conversation.conversation_id}/>
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
  conversations: PropTypes.shape({
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOtherUser: (user) => dispatch(setOtherUser(user)),
    getConversations: (id) => dispatch(getConversations(id))
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    bounty: state.bounty.bounty.bounty_id,
    conversations: state.conversations.conversations
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
