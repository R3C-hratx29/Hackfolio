/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import NavBar from './NavBar';
import Profile from './Profile';
// import { Router, Route, Switch} from 'react-router';

class Hackfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true
    };
  }

  render() {
    if (this.state.test) {
      console.log('ignore me');
    }
    const obj = {
      type: 'cat',
      payload: {
        blah: 'blahblah'
      }
    };
    if (this.state.test) {
      this.props.dispatch(obj);
      this.setState({ test: false });
    }
    console.log('actual blah', this.props.blah);
    return (
      <App className="App">
        <NavBar />
        <Heading>
          Hackfolio
        </Heading>
        <Profile />
      </App>
    );
  }
}

function mapStateToProps(state) {
  console.log('my state: ', state);
  return { initialState: state.initialState };
}

export default connect(mapStateToProps)(Hackfolio);
