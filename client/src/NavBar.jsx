/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
// import Title from 'grommet/components/Title';
import UserIcon from 'grommet/components/icons/base/User';
import Button from 'grommet/components/Button';
import HomeIcon from 'grommet/components/icons/base/Home';
import Modal from './Modal';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      modalPage: 'Login',
      modalState: false
    };
    this.testFunc = this.testFunc.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }
  testFunc(e) {
    this.setState({ modalPage: e });
    console.log(e);
  }
  closeModal() {
    this.setState({ modalState: false });
  }
  openModal() {
    this.setState({ modalState: true });
  }
  login(e) {
    this.setState({ modalState: false });
    console.log('login', e);
    // check db for matching user and save to current
  }
  signup(e) {
    this.setState({ modalState: false });
    console.log('signup', e);
    // add user to db
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
              icon={<HomeIcon />}
              label="Home Page"
              plain={true}
              onClick={() => { this.testFunc('Home Page'); }}
              href="/Home"
            />
            <Button
              icon={<UserIcon />}
              label="Profile"
              plain={true}
              onClick={() => { this.testFunc('Profile'); }}
              href="/Profile"
            />
            <Button
              label="Login"
              plain={true}
              onClick={this.openModal}
            />
            {this.state.modalState ?
              <Modal
                modalPage={this.state.modalPage}
                closeModal={this.closeModal}
                openModal={this.openModal}
                login={this.login}
                signup={this.signup}
                testFunc={this.testFunc}
                modalState={this.state.modalState}
              /> : <div />
            }
          </Box>
        </Header>
      </div>
    );
  }
}

export default NavBar;
