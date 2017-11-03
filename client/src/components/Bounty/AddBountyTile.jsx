/* eslint-disable react/prop-types */
import React from 'react';

// Grommet Components
import {
  Tile,
  Card,
  Image,
  Button
} from 'grommet';

import newProjectImage from './../../images/newProject.png';

const AddBountyTile = (props) => (
  <Tile
    className="AddProjectTile"
    size="medium"
    onClick={props.hideBountyLayer}
  >
    <Image
      size="medium"
      style={{ maxWidth: 384, maxHeight: 280 }}
      src={newProjectImage}
    />
    <Card
      contentPad="medium"
      heading={
        <Button
          primary
          label="Add New Bounty"
          onClick={props.hideBountyLayerFunction}
        />
      }
    />
  </Tile>
);

export default AddBountyTile;
