/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
// grommet components
import { Box, Anchor } from 'grommet';

import {
  SocialGithubIcon,
  SocialFacebookOptionIcon,
  SocialLinkedinIcon,
  SocialTwitterIcon
} from 'grommet/components/icons/base';

import './../styles/variables.scss';

const SocialIcon = {
  facebook: <SocialFacebookOptionIcon />,
  twitter: <SocialTwitterIcon />,
  linkedin: <SocialLinkedinIcon />,
  github: <SocialGithubIcon />
};

const SocialIcons = (props) => (
  <Box
    direction="row"
  >
    {props.socialLinks
          .filter((social) => social.link)
          .map((social) =>
            (
              <Anchor
                key={social.link}
                icon={SocialIcon[social.title]}
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
