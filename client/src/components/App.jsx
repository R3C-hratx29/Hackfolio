/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import NavBar from './NavBar';
import Profile from './Profile';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import exampleData from './../data/example-data';

const history = createBrowserHistory();

class Hackfolio extends Component {
  componentWillMount() {
    const obj = {
      type: 'SET_USER_PROFILE',
      payload: exampleData.profileOfOtherUser,
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
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/Home" component={HomePage} />
            <Route path="/Profile" component={Profile} />
            <Route component={LandingPage} />
          </Switch>
        </Router>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    userProfile: state.userProfile,
  };
}

export default connect(mapStateToProps)(Hackfolio);
