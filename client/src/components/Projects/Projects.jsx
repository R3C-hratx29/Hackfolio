import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Grommet Components
import {
  Tiles,
  Box,
  Button
} from 'grommet';

// Custom Components
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import ProfileBox from './../Profile/ProfileBox';
import AddProjectTile from './AddProjectTile';
import ReorderProjects from './ReorderProjects';

import './../../styles/Projects.scss';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideProjectModal: true,
      hideReorderModal: true,
      edit: null,
    };
    this.toggleProjectModal = this.toggleProjectModal.bind(this);
    this.toggleReorderModal = this.toggleReorderModal.bind(this);
    this.editProject = this.editProject.bind(this);
  }

  toggleProjectModal() {
    if (this.state.hideProjectModal) {
      this.setState({
        edit: null,
      });
    }
    this.setState({
      hideProjectModal: !this.state.hideProjectModal,
    });
  }

  toggleReorderModal() {
    this.setState({
      hideReorderModal: !this.state.hideReorderModal,
    });
  }

  editProject(project) {
    this.setState({
      hideProjectModal: false,
      edit: project,
    });
  }

  render() {
    const projects = this.props.userProfile.projects
      .sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        }

        // Else go to the 2nd item
        if (a.created_at < b.created_at) {
          return 1;
        } else if (a.created_at > b.created_at) {
          return -1;
        }

        return 0;
      })
      .map((project, index) => {
        const i = index;
        return <ProjectCard key={i} project={project} editProject={this.editProject} />;
      });
    return (
      <div className={`Projects ${this.props.isProfileOwner ? 'isProfileOwner' : ''}`}>
        {this.props.isProfileOwner && (
          <Box align="end" pad={{ horizontal: 'medium' }}>
            <Button primary onClick={this.toggleReorderModal} label="Reorder Projects" />
          </Box>
        )}
        <Tiles flush={false} justify="between">
          <ProfileBox isProfileOwner={this.props.isProfileOwner} />
          {projects}
          {this.props.isProfileOwner && (
            <AddProjectTile toggleProjectModal={this.toggleProjectModal} />
          )}
        </Tiles>
        <AddProject
          toggleProjectModal={this.toggleProjectModal}
          hideProjectModal={this.state.hideProjectModal}
          edit={this.state.edit}
        />
        <ReorderProjects
          toggleReorderModal={this.toggleReorderModal}
          hideReorderModal={this.state.hideReorderModal}
        />
      </div>
    );
  }
}

Projects.defaultProps = {
  userProfile: {},
};

Projects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
  isProfileOwner: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
