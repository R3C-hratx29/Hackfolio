import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Gromment Imports
import {
  Anchor,
  Layer,
  FormField,
  Button,
  TextInput,
  Box,
  Heading
} from 'grommet';

import BriefcaseIcon from 'grommet/components/icons/base/Briefcase';
import './../../styles/NavBar.scss';

// Custom Imports
import modalAction from './../../actions/ModalActions';
import * as UserAction from './../../actions/UserActions';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true,
      username: '',
      password: '',
      email: '',
    };
    this.toggle = this.toggle.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.addPassword = this.addPassword.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  componentWillMount() {
    this.setState({
      username: '',
      password: '',
      email: '',
      page: true
    });
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
  sendRequest() {
    if (this.state.page) {
      const obj = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.login(obj);
    } else {
      const objSign = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      };
      this.props.signup(objSign);
    }
  }

  render() {
    const text = this.state.page ? 'Login' : 'Signup';
    const welcome = this.state.page ? 'Welcome Back' : 'Welcome';
    const githubOauth = this.state.page ? 'Login with Github.' : 'Signup with Github.';
    const changeLink = this.state.page ? 'Not a user? Signup!' : 'Already have an account?';
    let usernameError = '';
    usernameError = this.state.page && this.props.valid === 'user' ? 'Username not found' : '';
    usernameError = this.props.valid === 'user' && usernameError === '' ? 'User already exists' : usernameError;
    return (
      <Layer className="LoginBox" closer onClose={this.props.closeModal}>
        <Box size={{ height: 'large', width: 'medium' }} justify="center" align="center">
          <Box margin={{ bottom: 'medium' }} alignContent="end" direction="row">
            <Box margin={{ right: 'medium' }}>
              <BriefcaseIcon type="icon" size="large" />
            </Box>
            <Box alignSelf="end">
              <Heading style={{ marginBottom: 0 }} tag="h2">
                {welcome}
              </Heading>
            </Box>
          </Box>
          <FormField
            label={this.state.page ? 'Username/Email' : 'Username'}
            error={usernameError}
          >
            <TextInput
              type="text"
              value={this.state.username}
              onDOMChange={this.addUsername}
            />
          </FormField>
          {this.state.page ?
            <div /> :
            <FormField
              label="Email"
              error={this.props.valid === 'email' ? 'Email is already taken' : ''}
            >
              <TextInput
                type="text"
                value={this.state.email}
                onDOMChange={this.addEmail}
              />
            </FormField>
          }
          <FormField
            error={this.props.valid === 'password' ? 'Wrong password' : ''}
            label="Password"
          >
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
            onClick={this.sendRequest}
          />
          <Anchor onClick={this.toggle} label={changeLink} />
          <Anchor className="inactiveLink" label="or" />
          <Anchor href="http://localhost:3001/api/auth/github" label={githubOauth} />
        </Box>
      </Layer>
    );
  }
}
Modal.defaultProps = {
  valid: ''
};

Modal.propTypes = {
  valid: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToprops = (state) => {
  return {
    valid: state.checkUser.error
  };
};

const mapDispatchToprops = dispatch => {
  return {
    closeModal: () => dispatch(modalAction('close')),
    signup: (e) => dispatch(UserAction.signup(e)),
    login: (e) => dispatch(UserAction.login(e)),
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(Modal);
