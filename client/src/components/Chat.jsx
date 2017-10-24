import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Form,
  FormField,
  TextInput,
  Button
} from 'grommet';
import SendIcon from 'grommet/components/icons/base/Send';
import Messages from './Messages';
import { getMessages } from '../actions/BountyActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }
  componentWillMount() {
    console.log('getting messages', this.props.bounty);
    this.props.getMessages(this.props.bounty);
  }
  sendMessage(e) {
    e.preventDefault();
    console.log(this.state.messageText, this.props.bounty, this.props.bountyHunter);
    axios.post('/api/message', {
      text: this.state.messageText,
      bountyId: this.props.bounty,
      bountyHunter: this.props.bountyHunter
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
        <Messages />
      </div>
    );
  }
}

Chat.propTypes = {
  bounty: PropTypes.number.isRequired,
  bountyHunter: PropTypes.number.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (id) => dispatch(getMessages(id))
  };
};

const mapStateToProps = (state) => {
  return {
    bounty: state.bounty.bounty.bounty_id,
    bountyHunter: state.bountyHunter.bounty_hunter.id
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
