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

class AddBountyTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render() {
    return (
      <Tile
        className="AddProjectTile"
        size="medium"
        onClick={this.props.hideBountyLayer}
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
              onClick={this.props.hideBountyLayer}
            />
          }
        />
      </Tile>
    );
  }
}

export default AddBountyTile;
