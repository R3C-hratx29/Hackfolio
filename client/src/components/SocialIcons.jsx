// react and redux
import { connect } from 'react-redux';
import React from 'react';

// grommet components
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

// grommet icons

const SocialIcons = () => (
  <Box>
    <Anchor
      icon={this.props.userProfile.socialLinks.icon}
      href={this.props.userProfile.socialLinks.link}
    />
  </Box>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    userProfile: state.userProfile,
    /* socialIcons: state.socialIcons */
  };
}

export default connect(mapStateToProps)(SocialIcons);
