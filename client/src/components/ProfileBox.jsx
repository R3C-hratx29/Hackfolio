/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */

// react and redux
import { connect } from 'react-redux';
import React from 'react';

// grommet components
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

import SocialIcons from './SocialIcons';

const ProfileBox = () => (
  <Box
    pad="large"
    align="center"
  >
    <Heading>
      {this.props.userProfile.name}
    </Heading>
    <Label>
      {this.props.userProfile.profession}
    </Label>
    <Tiles>
      <Tile>
        <Card
          margin="medium"
          separator="all"
          pad="small"
          thumbnail={this.props.userProfile.profile_pic}
          full="false"
          size="small"
          label="bio"
          textSize="small"
          flex={true}
        >
          {this.props.userProfile.bio}
        </Card>
      </Tile>
    </Tiles>
    <Box>
      {this.props.userProfile.socialLinks.map((social) => <SocialIcons key={social.id} />)}
    </Box>
  </Box>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps)(ProfileBox);
