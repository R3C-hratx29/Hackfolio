import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import {
  App,
  Sidebar,
  Header,
  Title,
  Box,
  Menu,
  Anchor,
  Split,
  Heading,
  Button
} from 'grommet';

import { setConversation, getConversations, getBounty } from '../../actions/BountyActions';
import socket from '../../socket';
import Messages from '../Chat/Messages';
import InputMessage from './InputMessage';
import BountyModal from '../Bounty/BountyModal';
import '../../styles/ConversationPage.scss';

class ConversationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: this.props.conversations[0].conversation_id, // TODO
      convoName: '',
      showBounty: false
    };
    this.closeBounty = this.closeBounty.bind(this);
  }
  componentDidMount() {
    this.props.getConversations(this.props.bounty, this.props.currentUser.user_id);
  }
  componentWillReceiveProps(next) {
    if (!_.isEqual(next.conversations, this.props.conversations)) {
      this.props.getConversations(next.currentUser.user_id);
      socket.removeListener(`conversations:${this.props.currentUser.user_id}`);
      socket.on(`conversation:${next.currentUser.user_id}`, () => {
        this.props.getConversations(this.props.bounty, next.user_id);
      });
    }
    if (next.currentUser.user_id !== this.props.currentUser.user_id) {
      this.props.getConversations(next.currentUser.user_id);
      socket.removeListener(`conversations:${this.props.currentUser.user_id}`);
      socket.on(`conversation:${next.currentUser.user_id}`, () => {
        this.props.getConversations(this.props.bounty, next.user_id);
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
    this.setState({ convoName: picked.name });
  }
  showBounty(bountyId) {
    this.props.getBounty(bountyId);
    this.setState({ showBounty: true });
  }
  closeBounty() {
    this.setState({ showBounty: false });
  }
  render() {
    return (
      <App>
        <Split
          fixed
          flex="right"
        >
          <Sidebar
            className="sidebar"
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
              pad={{ horizontal: 'medium', vertical: 'medium' }}
            >
              <Menu
                primary
                pad={{ between: 'medium' }}
              >
                { this.props.conversations.map((convo) => {
                  if (convo.conversation_id < 1) {
                    return <Box key={convo.conversation_id} />;
                  }
                  return (
                    <Box
                      direction="row"
                      justify="between"
                      key={convo.conversation_id}
                    >
                      <Anchor
                        label={convo.username}
                        onClick={() => this.pickConversation(convo)}
                        key={convo.conversation_id}
                      />
                      <Button
                        primary
                        label="Bounty"
                        onClick={() => this.showBounty(convo.bounty_id)}
                        key={convo.conversation_id + convo.bounty_hunter + convo.owner_id}
                      />
                    </Box>);
                }) }
              </Menu>
            </Box>
          </Sidebar>
          <Box
            pad={{ horizontal: 'large', vertical: 'small' }}
          >
            <Heading align="center" strong >
              {this.state.convoName}
            </Heading>
            <Messages id={this.state.conversation} />
            <InputMessage />
          </Box>
        </Split>
        { this.state.showBounty ?
          <BountyModal close={this.closeBounty} showSend={false} /> : <div />
        }
      </App>
    );
  }
}

ConversationPage.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    user_id: PropTypes.number
  }).isRequired,
  bounty: PropTypes.shape({}).isRequired,
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  getConversations: PropTypes.func.isRequired,
  setConversation: PropTypes.func.isRequired,
  getBounty: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: (id) => dispatch(getConversations(id)),
    setConversation: (convo) => dispatch(setConversation(convo)),
    getBounty: (id) => dispatch(getBounty(id))
  };
};

const mapStateToProps = (state) => {
  return {
    bounty: state.bounty,
    currentUser: state.currentUser,
    conversations: state.conversations
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPage);
