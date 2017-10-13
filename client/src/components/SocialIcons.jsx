import React from 'react';

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
  icon: 'Function',
  link: 'String'
};

SocialIcons.propTypes = {
  icon: 'Function',
  link: 'String'
};

export default SocialIcons;
