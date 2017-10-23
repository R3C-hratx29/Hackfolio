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
  Button,
  Form,
  FormField,
  Menu,
  List,
  ListItem,
} from 'grommet';

import {
  UserIcon,
  SearchIcon,
  LoginIcon,
  LogoutIcon,
  MultipleIcon,
  NotificationIcon,
  BookmarkIcon,
} from 'grommet/components/icons/base';

// Custom Imports
import Modal from './Modal';
import modalAction from '../actions/ModalActions';
import * as UserAction from '../actions/UserActions';
import { getProfile } from '../actions/ProfileActions';

import '../styles/NavBar.scss';

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
  sendSearch(e) {
    e.preventDefault();
    const temp = this.state.searchText;
    this.props.search(temp);
    this.setState({ searchText: '' });
  }
  goProfile() {
    const user = this.props.user.username;
    this.props.goToProfile(user);
  }
  goHome() {
    this.props.goToHome('/');
  }
  render() {
    return (
      <div className="NavBar">
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
                direction="row"
                onClick={this.goHome}
              >
                <Box
                  justify="center"
                >
                  <BookmarkIcon />
                </Box>
                <Box
                  justify="center"
                >
                  Hackfolio
                </Box>
              </Box>
              <Menu
                responsive={false}
                icon={<NotificationIcon />}
                closeOnClick
              >
                <List>
                  <ListItem
                    justify="start"
                    separator="horizontal"
                  >
                    THIS IS A NOTIFICATION!!!
                  </ListItem>
                  <ListItem
                    justify="start"
                    separator="horizontal"
                  >
                    This might be a longer notification.
                  </ListItem>
                  <ListItem
                    justify="start"
                    separator="horizontal"
                  >
                    Another one! <span role="img" aria-label="key">🔑</span>
                  </ListItem>
                  <ListItem
                    justify="start"
                    separator="horizontal"
                  >
                    New Message from Rachel for bounty: Make a Redux.
                  </ListItem>
                  <ListItem
                    justify="start"
                    separator="horizontal"
                  >
                    You need to scroll to be able to see this whole notification.
                  </ListItem>
                </List>
              </Menu>
              <Button
                icon={<MultipleIcon />}
                label="Bounty Board"
                plain
                onClick={this.goHome}
              />
              <Button
                icon={<UserIcon />}
                label="Profile"
                plain
                onClick={this.goProfile}
              />
            </Box>
            <Box
              separator="all"
              direction="row"
              primary={false}
            >
              <Form onSubmit={this.sendSearch} compact >
                <Box
                  direction="row"
                >
                  <FormField className="SearchInput">
                    <TextInput
                      placeHolder="Search"
                      onDOMChange={this.searchHandler}
                      value={this.state.searchText}
                    />
                  </FormField>
                  <Button
                    className="SearchIcon"
                    icon={<SearchIcon />}
                    type="submit"
                    plain
                  />
                </Box>
              </Form>
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
    search: (text) => { dispatch(UserAction.search(text)); dispatch(push('/search')); },
    goToHome: (path) => dispatch(push(path)),
    goToProfile: (user) => { dispatch(getProfile(user)); dispatch(push(`/user/${user}`)); },
    logout: () => dispatch(UserAction.logout()),
    displayHelp: (next) => dispatch(UserAction.help(next))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
