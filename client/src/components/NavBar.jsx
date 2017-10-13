/* eslint-disable react/jsx-boolean-value,react/prop-types,max-len */
import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import TextInput from 'grommet/components/TextInput';
// import Title from 'grommet/components/Title';
import UserIcon from 'grommet/components/icons/base/User';
import SearchIcon from 'grommet/components/icons/base/Search';
import LoginIcon from 'grommet/components/icons/base/Login';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Button from 'grommet/components/Button';
import HomeIcon from 'grommet/components/icons/base/Home';
import Modal from './Modal';
import modalAction from '../actions/user-profile-actions';
import * as userAction from '../actions/UserActions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }
  searchHandler(e) {
    this.setState({ searchText: e.target.value });
  }
  sendSearch() {
    const temp = this.state.searchText;
    this.props.search(temp);
    this.setState({ searchText: '' });
  }
  render() {
    const home = this.props.user === null ? '/' : '/Home';
    return (
      <div>
        <Header>
          <Box
            flex={true}
            justify="between"
            align="center"
            direction="row"
            responsive={true}
            colorIndex="brand"
            pad={{ vertical: 'medium', horizontal: 'small' }}
          >
            <Box
              flex={true}
              justify="start"
              align="center"
              direction="row"
            >
              <Button
                icon={<HomeIcon />}
                label="Home Page"
                plain={true}
                href={home}
              />
              <Button
                icon={<UserIcon />}
                label="Profile"
                plain={true}
                href="/Profile"
              />
            </Box>
            <Box
              separator="all"
              direction="row"
              primary={false}
            >
              <TextInput
                id="SearchBar"
                placeHolder="Search"
                onDOMChange={this.searchHandler}
                value={this.state.searchText}
              />
              <Button
                icon={<SearchIcon />}
                onClick={this.sendSearch}
                plain={true}
              />
            </Box>
            <Box>
              { this.props.user === null ?
                <Button label="Login" plain={true} icon={<LoginIcon />} onClick={this.props.openModal} /> :
                <Button label="Logout" plain={true} icon={<LogoutIcon />} onClick={this.props.logout} />
              }
            </Box>
          </Box>
        </Header>
        {this.props.modalState === 'open' ? <Modal /> : <div />}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalAction('open')),
    search: (text) => dispatch(userAction.search(text)),
    logout: () => dispatch(userAction.logout())
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    modalState: state.modalState
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
