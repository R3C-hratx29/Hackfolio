import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import {
  Anchor,
  Menu,
  Layer,
  Box,
  Heading
} from 'grommet';
import Messages from './Messages';
import InputMessage from './InputMessage';
import { setConversation, resetChat } from '../../actions/BountyActions';
import '../../styles/ChatModal.scss';

class ChatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: this.props.currentUser === this.props.conversation.owner_id
    };
  }
  componentWillMount() {
    this.props.resetChat(parseInt(this.props.match.params.id, 10));
  }
  componentWillReceiveProps(next) {
    if (this.props.currentUser !== next.currentUser) {
      this.props.resetChat(parseInt(this.props.match.params.id, 10));
      const isOwner = next.currentUser === next.conversation.owner_id;
      this.setState({ isOwner });
    }
    if (this.props.conversation.owner_id !== next.conversation.owner_id) {
      const isOwner = next.currentUser === next.conversation.owner_id;
      this.setState({ isOwner });
    }
  }
  render() {
    return (
      <Layer
        closer
        onClose={this.props.goToBounties}
      >
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
                  { this.props.conversations.map((convo) => {
                    if (convo.uid === this.props.currentUser) {
                      return (<div key={convo.conversation_id} />);
                    }
                    return (
                      <Anchor
                        label={convo.username}
                        onClick={() => this.props.setConversation(convo)}
                        key={convo.conversation_id}
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
            { this.props.conversation.conversation_id < 1 ?
              <div> Sorry no one has tried to contact you </div> :
              <Messages id={this.props.conversation.conversation_id} />
            }
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
  currentUser: PropTypes.number.isRequired,
  conversation: PropTypes.shape({
    conversation_id: PropTypes.number,
    owner_id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  conversations: PropTypes.arrayOf(PropTypes.object).isRequired,
  setConversation: PropTypes.func.isRequired,
  goToBounties: PropTypes.func.isRequired,
  resetChat: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConversation: (convo) => dispatch(setConversation(convo)),
    goToBounties: () => { dispatch(setConversation({ conversations_id: -1, owner_id: -1, name: '' })); dispatch(goBack()); },
    resetChat: (id) => dispatch(resetChat(id))
  };
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user_id,
    conversations: state.conversations,
    conversation: state.conversation,
    bounty: state.bounty
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
