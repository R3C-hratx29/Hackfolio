import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Grommet Imports
import {
  Header,
  Box,
  Tip,
  TextInput,
  Button
} from 'grommet';

import {
  UserIcon,
  SearchIcon,
  LoginIcon,
  LogoutIcon,
  HomeIcon
} from 'grommet/components/icons/base';

// Custom Imports
import Modal from './Modal';
import modalAction from '../actions/ModalActions';
import * as UserAction from '../actions/UserActions';
import { getProfile } from '../actions/ProfileActions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      help: false
    };
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
    const user = this.props.user.username;
    this.props.goToProfile(user);
  }
  goHome() {
    const home = this.props.user === undefined || this.props.user.jwt === undefined ? '/' : '/Home';
    this.props.goToHome(home);
  }
  render() {
    return (
      <div>
        <Header
          style={{ marginBottom: 22 }}
        >
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
              <Box
                style={{ fontSize: 28, fontWeight: 'bold', margin: '0 15px' }}
              >
                Hackfolio
              </Box>
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
              { this.props.user === undefined || this.props.user.jwt === undefined ?
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
            onClose={() => this.props.displayHelp('Home')}
          >
            Here you can search for other users
          </Tip> : <div />
        }
        { this.state.help && this.props.help === 'Tabs' ?
          <Tip
            target="tabs"
            onClose={() => this.props.displayHelp('Search')}
          >
            These will take you to the varies pages of Hackfolio
          </Tip> : <div />
        }
      </div>
    );
  }
}

NavBar.defaultProps = {
  user: {},
  help: 'off',
  modalState: 'close'
};

NavBar.propTypes = {
  user: PropTypes.shape({ jwt: PropTypes.string, username: PropTypes.string }),
  help: PropTypes.string,
  modalState: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  goToHome: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  displayHelp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    modalState: state.modalState.state,
    help: state.help.text
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalAction('open')),
    search: (text) => dispatch(UserAction.search(text)),
    goToHome: (path) => dispatch(push(path)),
    goToProfile: (user) => { dispatch(getProfile(user)); dispatch(push(`/user/${user}`)); },
    logout: () => dispatch(UserAction.logout()),
    displayHelp: (next) => dispatch(UserAction.help(next))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
