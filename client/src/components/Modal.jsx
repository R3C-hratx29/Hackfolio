/* eslint-disable react/prop-types, react/jsx-boolean-value */
import React from 'react';
import Layer from 'grommet/components/Layer';
import LoginForm from 'grommet/components/LoginForm';
import Anchor from 'grommet/components/Anchor';

const Modal = (props) => (
  <div>
    {props.modalPage === 'Login' ?
      <Layer closer={true} onClose={props.closeModal}>
        <LoginForm
          onSubmit={props.login}
          forgotPassword={
            <Anchor
              onClick={() => { props.testFunc('Signup'); }}
              label="Not a user? Signup!"
            />}
          usernameType="text"
        />
      </Layer> :
      <Layer closer={true} onClose={props.closeModal}>
        <LoginForm
          onSubmit={props.signup}
          forgotPassword={
            <Anchor
              onClick={() => { props.testFunc('Login'); }}
              label="Already have an account"
            />}
          usernameType="text"
        />
      </Layer>
    }
  </div>
);

export default Modal;
