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

const history = createBrowserHistory();

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
  console.log('my state: ', state);
  return { initialState: state.initialState };
}

export default connect(mapStateToProps)(Hackfolio);
