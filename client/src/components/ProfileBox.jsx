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

import SocialIcons from './SocialIcons';

const ProfileBox = (props) => (
  <Box
    pad="large"
    align="center"
  >
    <Heading>
      {props.userProfile.name}
    </Heading>
    <Label>
      {props.userProfile.profession}
    </Label>
    <Tiles>
      <Tile>
        <Card
          margin="medium"
          separator="all"
          pad="small"
          thumbnail={props.userProfile.profile_pic}
          full="false"
          size="small"
          label="bio"
          textSize="small"
          flex={true}
        >
          {props.userProfile.bio}
        </Card>
      </Tile>
    </Tiles>
    <Box>
      {props.userProfile.socialLinks.map((social) => (
        <SocialIcons
          icon={social.icon}
          link={social.link}
          key={social.id}
        />))
      }
    </Box>
  </Box>
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
