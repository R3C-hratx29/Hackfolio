import React from 'react';
import PropTypes from 'prop-types';
// grommet components
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

const SocialIcons = (props) => (
  <Box>
    <Anchor
      icon={props.icon}
      href={props.link}
    />
  </Box>
);

SocialIcons.defaultProps = {
  icon: {},
  link: PropTypes.func
};

SocialIcons.propTypes = {
  icon: {},
  link: PropTypes.func
};

export default SocialIcons;
