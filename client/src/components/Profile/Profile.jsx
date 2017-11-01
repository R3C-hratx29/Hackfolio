import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Projects from '../Projects/Projects';
import profileAction from '../../actions/ProfileActions';

const Profile = (props) => {
  const isProfileOwner = props.user ? props.match.params.id === props.user : false;
  props.getProfile(props.match.params.id);
  return (
    <div>
      { props.userProfile === -1 ?
        <div>
          No user found
        </div> :
        <div>
          <Projects isProfileOwner={isProfileOwner} />
        </div>
      }
    </div>
  );
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  userProfile: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  getProfile: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (username) => dispatch(profileAction(username))
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.currentUser.username,
    userProfile: state.userProfile.id
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
