/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */

// react and redux
import React from 'react';

// grommet components
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
      {props.userProfile.socialLinks.map((social) =>
        <SocialIcons icon={social.icon} link={social.link} key={social.id} />)}
    </Box>
  </Box>
);

ProfileBox.defaultProps = {
  userProfile: {},
  name: 'String',
  profession: 'String',
  profile_pic: 'String',
  bio: 'String'
};

ProfileBox.propTypes = {
  userProfile: {},
  name: 'String',
  profession: 'String',
  profile_pic: 'String',
  bio: 'String'
};

export default ProfileBox;
