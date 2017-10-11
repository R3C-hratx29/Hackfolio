import React, { Component } from 'react';
import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import { connect } from 'react-redux';
// import { Router, Route, Switch} from 'react-router';

class Hackfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    };
  }

  render() {
    if (this.state.test) {
      console.log('blah');
    }
    return (
      <App className="App">
        <Heading>
          Hello World!
        </Heading>
      </App>
    );
  }
}

function mapStateToProps(state) {
  console.log('my state: ', state);
  return {
    initialState: state.initialState
  };
}

export default connect(mapStateToProps)(Hackfolio);
