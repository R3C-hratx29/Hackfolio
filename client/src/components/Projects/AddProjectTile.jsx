import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import {
  Tile,
  Card,
  Image,
  Button
} from 'grommet';

import newProjectImage from './../../images/newProject.png';

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
