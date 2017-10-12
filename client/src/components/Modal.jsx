/* eslint-disable react/prop-types, react/jsx-boolean-value */
import React from 'react';
import Layer from 'grommet/components/Layer';
import LoginForm from 'grommet/components/LoginForm';
import Anchor from 'grommet/components/Anchor';
import { connect } from 'react-redux';
import modalAction from '../actions/user-profile-actions';
import * as UserAction from '../actions/UserActions';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: true
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ page: !this.state.page });
  }
  render() {
    return (
      <div>
        {this.state.page ?
          <Layer closer={true} onClose={this.props.closeModal}>
            <LoginForm
              onSubmit={this.props.login}
              forgotPassword={
                <Anchor
                  onClick={this.toggle}
                  label="Not a user? Signup!"
                />}
              usernameType="text"
            />
          </Layer> :
          <Layer closer={true} onClose={this.props.closeModal}>
            <LoginForm
              onSubmit={this.props.signup}
              forgotPassword={
                <Anchor
                  onClick={this.toggle}
                  label="Already have an account"
                />}
              usernameType="text"
            />
          </Layer>
        }
      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    closeModal: () => dispatch(modalAction('close')),
    openModal: () => dispatch(modalAction('open')),
    signup: (e) => { dispatch(UserAction.signup(e)); dispatch(modalAction('close')); },
    login: (e) => { dispatch(UserAction.login(e)); dispatch(modalAction('close')); }
  };
};

const mapStateToprops = (state) => {
  return {
    page: state.modalPage
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(Modal);
