import React from 'react';
import Layer from 'grommet/components/Layer';
import PropTypes from 'prop-types';

const AddProject = (props) => {
  return (
    <Layer closer onClose={props.toggleProjectModal} hidden={props.hideProjectModal}>
      Hi
    </Layer>
  );
};

AddProject.propTypes = {
  toggleProjectModal: PropTypes.func.isRequired,
  hideProjectModal: PropTypes.bool.isRequired,
};

export default AddProject;
