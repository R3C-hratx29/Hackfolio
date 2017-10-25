/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
// grommet components
import { Box, Anchor } from 'grommet';

import {
  SocialGithubIcon,
  SocialFacebookOptionIcon,
  SocialLinkedinIcon,
  SocialTwitterIcon,
  DocumentUserIcon,
} from 'grommet/components/icons/base';

import './../../styles/variables.scss';

const SocialIcon = {
  facebook: <SocialFacebookOptionIcon />,
  twitter: <SocialTwitterIcon />,
  linked_in: <SocialLinkedinIcon />,
  github: <SocialGithubIcon />,
  resume: <DocumentUserIcon />
};

const SocialIcons = (props) => (
  <Box
    direction="row"
  >
    {props.github &&
      <Anchor
        icon={SocialIcon.github}
        href={props.github}
        target="_blank"
      />
    }
    {props.twitter &&
      <Anchor
        icon={SocialIcon.twitter}
        href={props.twitter}
        target="_blank"
      />
    }
    {props.facebook &&
      <Anchor
        icon={SocialIcon.facebook}
        href={props.facebook}
        target="_blank"
      />
    }
    {props.linked_in &&
      <Anchor
        icon={SocialIcon.linked_in}
        href={props.linked_in}
        target="_blank"
      />
    }
    {props.resume &&
      <Anchor
        icon={SocialIcon.resume}
        href={props.resume}
        target="_blank"
      />
    }
  </Box>
);

const mapStateToProps = (state) => {
  return {
    github: state.userProfile.github,
    twitter: state.userProfile.twitter,
    linked_in: state.userProfile.linked_in,
    facebook: state.userProfile.facebook,
    resume: state.userProfile.resume
  };
};
export default connect(mapStateToProps)(SocialIcons);
