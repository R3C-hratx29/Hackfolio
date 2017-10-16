/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/require-default-props */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Grommet Components
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Image from 'grommet/components/Image';

import SocialIcons from './SocialIcons';

const ProfileBox = (props) => (
  <Tile
    full={false}
  >
    <Image
      size="medium"
      style={{ maxWidth: 384, maxHeight: 280 }}
      src={props.userProfile.profile_pic}
    />
    <Card
      contentPad="medium"
      heading={props.userProfile.name}
      description={
        <div>
          <Heading tag="h3">
            {props.userProfile.profession}
          </Heading>
        </div>
      }
    />
    <Box
      direction="row"
      justify="between"
      responsive={false}
    >
      <SocialIcons />
    </Box>
  </Tile>
);

ProfileBox.defaultProps = {
  userProfile: {}
};

ProfileBox.propTypes = {
  userProfile: {},
  name: PropTypes.string,
  profession: PropTypes.string,
  profile_pic: PropTypes.string,
  bio: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile
  };
};

export default connect(mapStateToProps)(ProfileBox);
