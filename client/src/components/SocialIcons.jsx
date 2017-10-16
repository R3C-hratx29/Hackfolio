/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
// grommet components
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

import './../styles/variables.scss';

const SocialIcons = (props) => (
  <Box
    direction="row"
  >
    {props.socialLinks
          .filter((social) => social.link)
          .map((social) =>
              (<Anchor
                icon={social.icon}
                href={social.link}
              />
            ))
    }
  </Box>
);

const mapStateToProps = (state) => {
  return {
    socialLinks: state.userProfile.socialLinks
  };
};
export default connect(mapStateToProps)(SocialIcons);
