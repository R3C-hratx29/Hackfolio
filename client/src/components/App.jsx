/* eslint-disable react/prefer-stateless-function,react/prop-types */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import App from 'grommet/components/App';
import createHistory from 'history/createBrowserHistory';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import HomePage from './HomePage';
import SearchPage from './NavBar/SearchPage';
import Chat from './Chat/Chat';

export const history = createHistory();

const Github = (props) => {
  if (props.match.params.token) {
    window.localStorage.token = props.match.params.token;
    window.location.href = `/user/${props.match.params.username}`;
  }
  return null;
};

class Hackfolio extends Component {
  render() {
    return (
      <App className="App">
        <NavBar />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/github/:token/:username"
              component={Github}
            />
            <Route path="/user/:id" component={Profile} />
            <Route path="/search" component={SearchPage} />
            <Route path="/chat" component={Chat} />
            <Route path="*" component={() => <div>Not Found</div>} />
          </Switch>
        </ConnectedRouter>
      </App>
    );
  }
}
export default Hackfolio;
