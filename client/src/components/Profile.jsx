/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ProfileBox from './ProfileBox';
import Projects from './Projects';
import profileAction from '../actions/ProfileActions';

class Profile extends React.Component {
  componentWillMount() {
    // set user
    this.props.getProfile(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        { this.props.userProfile === null || this.props.userProfile === undefined ?
          <div>
            No user found
          </div> :
          <div>
            <ProfileBox />
            <Projects />
          </div>
        }
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => dispatch(profileAction(id))
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    userProfile: state.userProfile.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
