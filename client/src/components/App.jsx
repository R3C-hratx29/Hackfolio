/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import axios from 'axios';
import App from 'grommet/components/App';
import createHistory from 'history/createBrowserHistory';
import Profile from './Profile/Profile';
import NavBar from './NavBar/NavBar';
import HomePage from './HomePage';
import SearchPage from './NavBar/SearchPage';
import Chat from './Chat/Chat';

export const history = createHistory();

axios.defaults.headers.common.jwt = window.localStorage.token;

class Hackfolio extends React.Component {
  componentWillMount() {
    if (window.localStorage.token) {
      axios.get('/api/me')
        .then(res => {
          this.props.store.dispatch({
            type: 'SET_CURRENT_USER',
            payload: {
              user: {
                username: res.headers.username,
                jwt: window.localStorage.token,
                user_id: parseInt(res.headers.user_id, 10)
              }
            }

          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.props.store.dispatch({
      type: 'BOUNTY',
      payload: {
        bounty: {
          bounty_id: 3,
          title: 'test',
          owner: 18
        }
      }
    });
  }
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
