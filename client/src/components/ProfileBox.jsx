/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import { connect } from 'react-redux';
/* import PropTypes from 'prop-types'; */

// Grommet Components
import {
  Card,
  Box,
  Heading,
  Tile,
  Image,
  Anchor,
  Tip
} from 'grommet';

// Grommet Icons
import EditIcon from 'grommet/components/icons/base/Edit';

// Custom Components
import EditProfile from './EditProfile';
import { changeProfile } from './../actions/ProfileActions';
import * as UserAction from '../actions/UserActions';

class ProfileBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideModal: true,
      help: false,
    };
    this.showTip = this.showTip.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
    setTimeout(this.showTip, 500);
  }

  hideModal() {
    this.setState({
      hideModal: !this.state.hideModal
    });
  }

  showTip() {
    this.setState({ help: true });
  }

  render() {
    const descriptionBox =
      (
        <div>
          <Heading tag="h3">
            {this.props.userProfile.profession}
          </Heading>
          {this.props.userProfile.bio}
        </div>
      );
    return (
      <Tile
        full={false}
        align="center"
        style={{ boxShadow: '0px 0px 13px 8px rgba(0, 0, 0, 0.1)' }}
      >
        { this.state.help && this.props.help === 'Profile' ?
          <Tip
            onClose={this.props.displayHelp}
            target="edit"
          >
            Click here to edit your profile
          </Tip> : <div />
        }
        <Image
          size="medium"
          style={{ maxWidth: 384, maxHeight: 280 }}
          src={this.props.userProfile.profile_pic}
        />
        <Card
          heading={this.props.userProfile.name}
          contentPad="medium"
          description={descriptionBox}
        />
        <Box
          direction="row"
          justify="between"
          style={{ minWidth: 384 }}
          size="medium"
          responsive={false}
        >
          {
            this.props.isProfileOwner &&
            <Box>
              <Anchor
                icon={<EditIcon id="edit" />}
                onClick={this.hideModal}
              />
              <EditProfile hideModal={this.hideModal} hidden={this.state.hideModal} />
            </Box>
          }
        </Box>
      </Tile>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveChanges: (changes, profile) => dispatch(changeProfile(changes, profile)),
    displayHelp: () => dispatch(UserAction.help('Project'))
  };
};

const mapStateToProps = (state) => {
  return {
    help: state.help.text,
    userProfile: state.userProfile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
