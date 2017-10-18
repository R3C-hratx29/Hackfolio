import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Reorder, {
  reorder
} from 'react-reorder';

// Grommet Components
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';

import { changeProjects } from '../actions/ProfileActions';

// Custom Styles
import '../styles/ReorderProjects.scss';

class ReorderProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onReorder = this.onReorder.bind(this);
  }

  onReorder(event, previousIndex, nextIndex) {
    const newProjects = reorder(this.props.userProfile.projects, previousIndex, nextIndex);
    this.props.changeProjects(newProjects);
  }

  render() {
    return (
      <Layer
        className="ReorderProjects"
        closer
        onClose={this.props.toggleReorderModal}
        hidden={this.props.hideReorderModal}
      >
        <Box
          pad={{
            horizontal: 'medium',
            vertical: 'large'
          }}
        >
          <Heading>
            Reorder Projects
          </Heading>
          <Reorder
            reorderId="projects"
            component="ul"
            className="grommetux-list"
            onReorder={this.onReorder}
          >
            {
              this.props.userProfile.projects.map((project) => (
                <ListItem key={project.id + Math.random()} justify="start" className="project">
                  <div
                    className="image"
                    style={{
                          backgroundImage: `url(${project.images[0]})`,
                    }}
                  />
                  <div className="body">
                    <div className="title">{project.title}</div>
                    <div className="description">{project.description}</div>
                  </div>
                </ListItem>
              ))
            }
          </Reorder>
        </Box>
      </Layer>
    );
  }
}

ReorderProjects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
  toggleReorderModal: PropTypes.func.isRequired,
  hideReorderModal: PropTypes.bool.isRequired,
  changeProjects: PropTypes.func.isRequired
};

ReorderProjects.defaultProps = {
  userProfile: {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProjects: (projects) => dispatch(changeProjects(projects))
  };
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReorderProjects);
