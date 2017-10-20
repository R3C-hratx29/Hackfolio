import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';

import newProjectImage from '../images/newProject.png';

const AddProjectTile = (props) => (
  <Tile
    className="AddProjectTile"
    size="medium"
    onClick={props.toggleProjectModal}
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
          label="Add New Project"
          onClick={props.toggleProjectModal}
        />
      }
    />
  </Tile>
);

AddProjectTile.propTypes = {
  toggleProjectModal: PropTypes.func.isRequired
};

export default AddProjectTile;
