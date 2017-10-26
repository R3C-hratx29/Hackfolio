import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Message from './Message';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id > 0 && nextProps.id !== this.props.id) {
      console.log('here', nextProps.id);
      axios.get('/api/messages', {
        params: { conversationId: nextProps.id }
      })
        .then((results) => {
          console.log(results.data);
          this.setState({ messages: results.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
Messages.defaultProps = {
  id: -1
};


Messages.propTypes = {
  id: PropTypes.number
};

export default Messages;
