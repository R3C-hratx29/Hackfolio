/* eslint-disable react/prop-types */
import React from 'react';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import BriefcaseIcon from 'grommet/components/icons/base/Briefcase';
import Heading from 'grommet/components/Heading';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import modalAction from '../actions/ModalActions';
import * as UserAction from '../actions/UserActions';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true,
      username: '',
      password: ''
    };
    this.toggle = this.toggle.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.addPassword = this.addPassword.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.sendSignup = this.sendSignup.bind(this);
  }
  toggle() {
    this.setState({ page: !this.state.page });
  }
  addEmail(e) {
    this.setState({ email: e.target.value });
  }
  addUsername(e) {
    this.setState({ username: e.target.value });
  }
  addPassword(e) {
    this.setState({ password: e.target.value });
  }
  sendSignup() {
    this.props.signup({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    });
    this.setState({
      username: '',
      password: '',
      email: ''
    });
    this.toggle();
  }
  render() {
    const text = this.state.page ? 'Login' : 'Signup';
    const welcome = this.state.page ? 'Welcome Back' : 'Welcome';
    return (
      <Layer closer onClose={this.props.closeModal}>
        <Box
          size={{ height: 'medium', width: 'medium' }}
          justify="center"
          align="center"
        >
          <Box
            margin={{ bottom: 'medium' }}
            alignContent="end"
            direction="row"
          >
            <Box margin={{ right: 'medium' }} >
              <BriefcaseIcon type="icon" size="large" />
            </Box>
            <Box alignSelf="end">
              <Heading style={{ marginBottom: 0 }} tag="h2">
                {welcome}
              </Heading>
            </Box>
          </Box>
          <FormField label="Username">
            <TextInput
              type="text"
              value={this.state.username}
              onDOMChange={this.addUsername}
            />
          </FormField>
          {this.state.page ?
            <div /> :
            <FormField label="Email">
              <TextInput
                type="email"
                value={this.state.email}
                onDOMChange={this.addEmail}
              />
            </FormField>
          }
          <FormField label="Password">
            <TextInput
              type="password"
              value={this.state.password}
              onDOMChange={this.addPassword}
            />
          </FormField>
          <Button
            box
            margin="small"
            size={{ width: 'small' }}
            primary
            type="button"
            label={text}
            onClick={this.sendSignup}
          />
          <Anchor
            onClick={this.toggle}
            label="Not a user? Signup!"
          />
        </Box>
      </Layer>
    );
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    closeModal: () => dispatch(modalAction('close')),
    openModal: () => dispatch(modalAction('open')),
    signup: (e) => { dispatch(UserAction.signup(e)); dispatch(modalAction('close')); dispatch(UserAction.help('Home')); dispatch(push('/Home')); },
    login: (e) => { dispatch(UserAction.login(e)); dispatch(modalAction('close')); }
  };
};

const mapStateToprops = (state) => {
  return {
    page: state.modalPage
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(Modal);
