import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  App,
  Sidebar,
  Header,
  Title,
  Box,
  Menu,
  Anchor,
  Split
} from 'grommet';

import { setConversation, getConversations } from '../../actions/BountyActions';
import socket from '../../socket';
import Messages from '../Chat/Messages';

class ConversationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: this.props.conversations[0] // TODO
    };
  }
  componentDidMount() {
    this.props.getConversations(this.props.currentUser.user_id);
  }
  componentWillReciveProps(next) {
    if (next.currentUser.user_id !== this.props.currentUser.user_id) {
      this.props.getConversations(next.currentUser.user_id);
      socket.removeListener(`conversations:${this.props.currentUser.user_id}`);
      socket.on(`conversation:${next.currentUser.user_id}`, () => {
        this.props.getConversations(next.user_id);
      });
    }
  }
  pickConversation(picked) {
    this.props.conversations.forEach((convo) => {
      if (convo.conversation_id === picked.conversation_id) {
        this.props.setConversation(convo);
      }
    });
    this.setState({ conversation: picked.conversation_id });
  }
  render() {
    return (
      <App>
        <Split
          fixed
          flex="right"
        >
          <Sidebar
            colorIndex="unknown"
            full={false}
          >
            <Header
              pad="medium"
              justify="between"
            >
              <Title>
                Conversations
              </Title>
            </Header>
            <Box
              justify="start"
            >
              <Menu
                primary
              >
                { this.props.conversations.map((convo) => {
                  return (
                    <Anchor
                      label={convo.name}
                      onClick={() => this.pickConversation(convo)}
                      key={convo.conversation_id}
                    />);
                }) }
              </Menu>
            </Box>
          </Sidebar>
          <Box
            pad={{ horizontal: 'large', vertical: 'small' }}
          >
            <Messages id={this.state.conversation} />
          </Box>
        </Split>
      </App>
    );
  }
}

ConversationPage.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    user_id: PropTypes.number
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
    conversations: state.conversations.conversations
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
