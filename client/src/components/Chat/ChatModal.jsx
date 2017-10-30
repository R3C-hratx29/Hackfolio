import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Anchor,
  Menu,
  Layer,
  Box,
  Heading
} from 'grommet';
import Messages from './Messages';
import InputMessage from './InputMessage';
import { setConversation, getConversations } from '../../actions/BountyActions';
import '../../styles/ChatModal.scss';

class ChatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: this.props.currentUser === this.props.bounty.owner_id
    };
  }
  componentWillMount() {
    this.props.getConversations(this.props.bounty, this.state.isOwner);
  }
  componentWillReceiveProps(next) {
    let { isOwner } = this.state;
    if (this.props.conversation.owner_id !== next.conversation.owner_id) {
      if (next.conversation.owner_id === next.currentUser) {
        isOwner = true;
        this.setState({ isOwner: true });
      }
    }
    if (this.props.bounty !== next.bounty || this.props.currentUser !== next.currentUser) {
      next.getConversations(next.bounty, isOwner);
    }
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
          className="ChatModal"
          pad={{ horizantial: 'medium', vertical: 'medium', between: 'small' }}
        >
          <Box direction="row" justify="between">
            <Heading>{this.props.conversation.name}</Heading>
            <Box className="userMenu">
              { this.state.isOwner ?
                <Menu
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
          <Box>
            <InputMessage />
          </Box>
        </Box>
      </Layer>
    );
  }
}

ChatModal.propTypes = {
  currentUser: PropTypes.string.isRequired,
  bounty: PropTypes.number.isRequired,
  bountyHunters: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.number,
    username: PropTypes.username
  })).isRequired,
  conversation: PropTypes.shape({
    conversation_id: PropTypes.number,
    owner_id: PropTypes.number,
    name: PropTypes.string
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
    currentUser: state.currentUser.user.user_id,
    bounty: state.bounty.bounty,
    conversations: state.conversations.conversations,
    conversation: state.conversation.conversation,
    bountyHunters: state.bountyHunters.bountyHunters
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
