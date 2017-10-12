/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import NavBar from './NavBar';
import Profile from './Profile';
// import { Router, Route, Switch} from 'react-router';

import exampleData from './example-data';

class Hackfolio extends Component {

  componentWillMount() {
    const obj = {
      type: 'SET_USER_PROFILE',
      payload: exampleData.profileOfOtherUser
    };
    this.props.dispatch(obj);
  }

  render() {
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
  return {
    currentUser: state.currentUser,
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps)(Hackfolio);
