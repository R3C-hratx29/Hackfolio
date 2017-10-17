/* eslint-disable react/prop-types, max-len */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Tip from 'grommet/components/Tip';
import TextInput from 'grommet/components/TextInput';
// import Title from 'grommet/components/Title';
import UserIcon from 'grommet/components/icons/base/User';
import SearchIcon from 'grommet/components/icons/base/Search';
import LoginIcon from 'grommet/components/icons/base/Login';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Button from 'grommet/components/Button';
import HomeIcon from 'grommet/components/icons/base/Home';
import Modal from './Modal';
import modalAction from '../actions/ModalActions';
import * as UserAction from '../actions/UserActions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      help: false
    };
    // this.match.params.username
    this.searchHandler = this.searchHandler.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
    this.goProfile = this.goProfile.bind(this);
    this.goHome = this.goHome.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ help: true });
    }, 500);
  }
  searchHandler(e) {
    this.setState({ searchText: e.target.value });
  }
  sendSearch() {
    const temp = this.state.searchText;
    this.props.search(temp);
    this.setState({ searchText: '' });
  }
  goProfile() {
    const user = `/user/${this.props.userProfile}`; // need to change to current user
    this.props.goTo(user);
  }
  goHome() {
    const home = this.props.user === null ? '/' : '/Home';
    this.props.goTo(home);
  }
  render() {
    return (
      <div>
        <Header>
          <Box
            flex
            justify="between"
            align="center"
            direction="row"
            responsive
            colorIndex="brand"
            pad={{ vertical: 'medium', horizontal: 'small' }}
          >
            <Box
              id="tabs"
              flex
              justify="start"
              align="center"
              direction="row"
            >
              <Button
                icon={<HomeIcon />}
                label="Home Page"
                plain
                path="/Home"
                onClick={this.goHome}
              />
              <Button
                icon={<UserIcon />}
                label="Profile"
                plain
                path="/Profile"
                onClick={this.goProfile}
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
                plain
              />
            </Box>
            <Box>
              { this.props.user === null ?
                <Button label="Login" plain icon={<LoginIcon />} onClick={this.props.openModal} /> :
                <Button label="Logout" plain icon={<LogoutIcon />} onClick={this.props.logout} />
              }
            </Box>
          </Box>
        </Header>
        {this.props.modalState === 'open' ? <Modal /> : <div />}
        { this.state.help && this.props.help === 'Search' ?
          <Tip
            target="SearchBar"
            onClose={() => this.props.displayHelp('Tabs')}
          >
            Here you can search for other users
          </Tip> : <div />
        }
        { this.state.help && this.props.help === 'Tabs' ?
          <Tip
            target="tabs"
            onClose={() => this.props.displayHelp('Profile')}
          >
            These will take you to the varies pages of Hackfolio
          </Tip> : <div />
        }
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalAction('open')),
    search: (text) => dispatch(UserAction.search(text)),
    goTo: (path) => dispatch(push(path)),
    logout: () => dispatch(UserAction.logout()),
    displayHelp: (next) => dispatch(UserAction.help(next))
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    modalState: state.modalState,
    help: state.help.text,
    userProfile: state.userProfile.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
