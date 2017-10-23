/* eslint-disable react/prefer-stateless-function,react/prop-types */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import App from 'grommet/components/App';
import createHistory from 'history/createBrowserHistory';
import Profile from './Profile';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import Chat from './Chat';

export const history = createHistory();

class Hackfolio extends Component {
  render() {
    return (
      <App className="App">
        <NavBar />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user/:id" component={Profile} />
            <Route path="/search" component={SearchPage} />
            <Route path="/chat" component={Chat} />
            <Route component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </App>
    );
  }
}
export default Hackfolio;
