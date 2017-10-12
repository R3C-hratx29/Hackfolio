/* eslint-disable react/jsx-boolean-value,react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
// import Title from 'grommet/components/Title';
import UserIcon from 'grommet/components/icons/base/User';
import Button from 'grommet/components/Button';
import HomeIcon from 'grommet/components/icons/base/Home';
import Modal from './Modal';
import modalAction from '../actions/user-profile-actions';


const NavBar = (props) => (
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
          href="/Home"
        />
        <Button
          icon={<UserIcon />}
          label="Profile"
          plain={true}
          href="/Profile"
        />
        <Button
          label="Login"
          plain={true}
          onClick={props.openModal}
        />
        {props.modalState === 'open' ? <Modal /> : <div />}
      </Box>
    </Header>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalAction('open'))
  };
};

const mapStateToProps = (state) => {
  return {
    modalState: state.modalState
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
