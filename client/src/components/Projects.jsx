import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Grommet Components
import Tiles from 'grommet/components/Tiles';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

// Grommet Icons
import AddIcon from 'grommet/components/icons/base/Add';

// Custom Components
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import ProfileBox from './ProfileBox';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideProjectModal: true
    };

    this.toggleProjectModal = this.toggleProjectModal.bind(this);
  }

  toggleProjectModal() {
    this.setState({
      hideProjectModal: !this.state.hideProjectModal
    });
  }

  render() {
    const projects = this.props.userProfile.projects.map((project, index) => {
      const i = index;
      return (
        <ProjectCard key={i} project={project} />
      );
    });

    return (
      <div className="Projects">
        <Box
          align="center"
        >
          <Button
            label="Add Project"
            icon={<AddIcon />}
            primary
            onClick={this.toggleProjectModal}
          />
        </Box>
        <Tiles
          fill
          flush={false}
        >
          <ProfileBox />
          {projects}
        </Tiles>
        <AddProject
          toggleProjectModal={this.toggleProjectModal}
          hideProjectModal={this.state.hideProjectModal}
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
};


function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

export default connect(mapStateToProps)(Projects);
