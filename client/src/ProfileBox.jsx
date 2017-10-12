/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
/* import Tiles from 'grommet/Listing/Tiles'*/

const ProfileBox = () => (
  <Box
    separator="all"
    pad="large"
    colorIndex="light-2"
  >
    <Heading>
        Rhiannon Le Parmentier
    </Heading>
        <Label>
            Software Engineer
        </Label>
    <Card
      margin="medium"
      separator="all"
      pad="small"
      thumbnail="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-0/p206x206/12670_995538368000_1494101030_n.jpg?oh=2566aac7667d9786c1ad26b6c380e231&oe=5A6E717C"
      full="false"
      size="small"
      label="bio"
      textSize="small"
      colorIndex="light-1"
      flex={true}
    > I like making react apps and hanging out at Hack Reactor
    </Card>
  </Box>
);

export default ProfileBox;
