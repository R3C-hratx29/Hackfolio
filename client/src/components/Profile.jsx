/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Projects from './Projects';
import { getProfile } from '../actions/ProfileActions';

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
            <Projects />
          </div>
        }
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => dispatch(getProfile(id))
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.user,
    userProfile: state.userProfile.username
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
