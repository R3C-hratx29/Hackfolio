/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import App from 'grommet/components/App';
import ProfileBox from './ProfileBox.jsx';
import Heading from 'grommet/components/Heading';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Label from 'grommet/components/Label';

import { connect } from 'react-redux';
import NavBar from './NavBar';
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
            Rhiannon Le Parmentier
        </Heading>
        <Label>
            Software Engineer & Austrian Beer Maid
        </Label>
        <div>
            <ProfileBox />
        </div>
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
