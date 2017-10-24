import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from './Message';

<<<<<<< HEAD
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    console.log('here');
    axios.get('/api/messages', {
      params: { conversationId: this.props.id }
    })
      .then((results) => {
        console.log(results.data);
        this.setState({ messages: results.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        { this.state.messages.map((message) => {
          return <Message message={message} key={message.message_id} />;
        })}
      </div>
    );
  }
}
=======
const Messages = (props) => (
  <div>
    { props.messages.map((message) => {
      return <Message message={message} key={message.id} />;
    })}
  </div>
);
>>>>>>> rebase

Messages.defaultProps = {
  id: -1
};


Messages.propTypes = {
  id: PropTypes.number
};

export default Messages;
