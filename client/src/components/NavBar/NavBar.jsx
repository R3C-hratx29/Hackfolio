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
import modalAction from './../../actions/ModalActions';
import * as UserAction from './../../actions/UserActions';
import { getProfile } from './../../actions/ProfileActions';

import './../../styles/NavBar.scss';

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
    if (window.localStorage.token) {
      this.props.getNotifications();
    }
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
              <Button
                icon={<MultipleIcon />}
                label="Bounty Board"
                plain
                onClick={this.goHome}
              />
              { this.props.user.username &&
                <Button
                  icon={<UserIcon />}
                  label="Profile"
                  plain
                  onClick={this.goProfile}
                />
              }
              { this.props.user.username &&
                <Menu
                  responsive={false}
                  icon={<NotificationIcon />}
                  closeOnClick
                  className={`${this.props.notifications.notifications.length ? 'dot' : 'nodot'} notifications`}
                >
                  <List ref={(ref) => { if (ref) ref.listRef.closest('.grommetux-drop').classList.add('droptop'); }}>
                    {
                      this.props.notifications.notifications.sort((a, b) => {
                        return a.created_at < b.created_at;
                      }).map((notification) => {
                        return (
                          <ListItem
                            key={notification.id}
                            justify="start"
                            separator="horizontal"
                            onClick={() => { this.props.deleteNotification(notification.id); }}
                          >
                            {notification.message}
                          </ListItem>
                        );
                      })
                    }
                  </List>
                </Menu>
              }
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
  modalState: 'close',
  notifications: {
    notifications: []
  },
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
  getNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  notifications: PropTypes.shape({ notifications: PropTypes.array })
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    modalState: state.modalState.state,
    help: state.help.text,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(modalAction('open')),
    search: (text) => { dispatch(UserAction.search(text)); dispatch(push('/search')); },
    goToHome: (path) => dispatch(push(path)),
    goToProfile: (user) => { dispatch(getProfile(user)); dispatch(push(`/user/${user}`)); },
    logout: () => dispatch(UserAction.logout()),
    displayHelp: (next) => dispatch(UserAction.help(next)),
    getNotifications: () => dispatch(UserAction.getNotifications()),
    deleteNotification: (id) => dispatch(UserAction.deleteNotification(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
