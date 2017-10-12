/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
// import Title from 'grommet/components/Title';
import UserIcon from 'grommet/components/icons/base/User';
import Button from 'grommet/components/Button';
import HomeIcon from 'grommet/components/icons/base/Home';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      test: false
    };
    this.testFunc = this.testFunc.bind(this);
  }
  testFunc(e) {
    this.setState({ test: true });
    console.log(this.state.test, e);
  }
  render() {
    return (
      <div>
        <Header>
          <Box
            flex={true}
            justify="start"
            direction="row"
            responsive={false}
            colorIndex="brand"
            pad={{ vertical: 'medium', horizontal: 'small' }}
          >
            <Button
              icon={<UserIcon />}
              label="Profile"
              plain={true}
              onClick={() => { this.testFunc('Profile'); }}
            />
            <Button
              icon={<HomeIcon />}
              label="Home Page"
              plain={true}
              onClick={() => { this.testFunc('Home Page'); }}
            />
          </Box>
        </Header>
      </div>
    );
  }
}

export default NavBar;
