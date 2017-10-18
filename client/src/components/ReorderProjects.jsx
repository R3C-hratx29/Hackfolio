import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';

import Layer from 'grommet/components/Layer';

class ReorderProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.userProfile.projects
    };
  }

  render() {
    return (
      <Layer
        className="ReorderProjects"
        closer
        onClose={this.props.toggleReorderModal}
        hidden={this.props.hideReorderModal}
      >
        <div>Hi</div>
      </Layer>
    );
  }
}

ReorderProjects.propTypes = {
  toggleReorderModal: PropTypes.func.isRequired,
  hideReorderModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    help: state.help.text
  };
}

export default connect(mapStateToProps)(ReorderProjects);
