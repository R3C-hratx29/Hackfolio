/* eslint-disable react/prop-types,react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from 'grommet/components/App';
import Heading from 'grommet/components/Heading';
import createHistory from 'history/createBrowserHistory';
import Profile from './Profile';
import NavBar from './NavBar'
import HomePage from './HomePage';
import LandingPage from './LandingPage';

export const history = createHistory();

class Hackfolio extends Component {
  render() {
    return (
      <App className="App">
        <NavBar />
        <Heading>
          Hackfolio
        </Heading>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/user/:id" component={Profile} />
            <Route path="/Home" component={HomePage} />
            <Route component={LandingPage} />
          </Switch>
        </ConnectedRouter>
      </App>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    userProfile: state.userProfile,
    location: state.location
  };
}

export default connect(mapStateToProps)(Hackfolio);
