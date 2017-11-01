import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Grommet Imports
import {
  Menu,
  List,
  ListItem,
} from 'grommet';

// Grommet Icons
import { NotificationIcon } from 'grommet/components/icons/base';

import * as UserAction from './../../actions/UserActions';

import socket from '../../socket';

// Custom Styles
import './../../styles/Notifications.scss';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationChannel: null,
    };
  }

  componentDidMount() {
    if (window.localStorage.token) {
      this.props.getNotifications();
    }
  }

  componentWillReceiveProps(next) {
    const { notificationChannel } = this.state;

    if (next.user) {
      const { username } = next.user;

      if (!notificationChannel || username !== notificationChannel) {
        if (notificationChannel) {
          // Remove previous user's event listener
          socket.removeListener(`notification:${notificationChannel}`);
        }
        // Add new user's event listener
        socket.on(`notification:${username}`, () => {
          this.props.getNotifications();
        });
        this.setState({
          notificationChannel: username
        });
      }
    }
  }

  render() {
    return (
      <Menu
        responsive={false}
        icon={
          <div>
            <NotificationIcon />
            <div className="dotDiv">
              {this.props.notifications.length > 0 &&
              this.props.notifications.length}
            </div>
          </div>
        }
        closeOnClick
        className={`${this.props.notifications.length ? 'dot' : ''} Notifications`}
      >
        <List ref={(ref) => { if (ref) ref.listRef.closest('.grommetux-drop').classList.add('droptop'); }}>
          {
            this.props.notifications.length === 0 &&
            <ListItem
              justify="start"
              separator="horizontal"
            >
              You have no notifications.
            </ListItem>
          }
          {
            this.props.notifications.sort((a, b) => {
              return a.created_at < b.created_at;
            }).map((notification) => {
              return (
                <ListItem
                  key={notification.id}
                  justify="start"
                  separator="horizontal"
                  onClick={() => { this.props.deleteNotification(notification.id); }}
                >
                  <span dangerouslySetInnerHTML={{ __html: notification.message }} />
                </ListItem>
              );
            })
          }
        </List>
      </Menu>
    );
  }
}

Notifications.defaultProps = {
  notifications: []
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  getNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(UserAction.getNotifications()),
    deleteNotification: (id) => dispatch(UserAction.deleteNotification(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
