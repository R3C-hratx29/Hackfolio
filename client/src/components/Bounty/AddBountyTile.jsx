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
import AddBountyCardLayer from './AddBountyCardLayer';

class AddBountyTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideBountyLayer: true
    };
    this.hideBountyLayerFunction = this.hideBountyLayerFunction.bind(this);
  }

  hideBountyLayerFunction() {
    this.setState({
      hideBountyLayer: !this.state.hideBountyLayer
    });
  }

  render() {
    return (
      <Tile
        className="AddProjectTile"
        size="medium"
        onClick={this.hideBountyLayerFunction}
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
              onClick={this.hideBountyLayerFunction}
            />
          }
        />
        <AddBountyCardLayer
          hideBountyLayer={this.hideBountyLayerFunction}
          hidden={this.state.hideBountyLayer}
          imageURLHidden={this.props.imageURLHidden}
        />
      </Tile>
    );
  }
}

export default AddBountyTile;
