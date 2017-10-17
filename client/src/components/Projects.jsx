import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Grommet Components
import Tiles from 'grommet/components/Tiles';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tip from 'grommet/components/Tip';

// Grommet Icons
import AddIcon from 'grommet/components/icons/base/Add';

// Custom Components
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import ProfileBox from './ProfileBox';
import * as UserAction from '../actions/UserActions';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideProjectModal: true,
      help: false
    };

    this.toggleProjectModal = this.toggleProjectModal.bind(this);
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        help: true
      });
    }, 500);
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
            id="AddProjectBtn"
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
        {this.props.help === 'Project' && this.state.help ?
          <Tip
            target="AddProjectBtn"
            onClose={this.props.displayHelp}
          >
            You can add projects to show off here
          </Tip> : <div />
        }
      </div>
    );
  }
}

Projects.defaultProps = {
  userProfile: {},
  help: 'off',
  displayHelp: () => {}
};

Projects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
  help: PropTypes.string,
  displayHelp: PropTypes.func
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    help: state.help.text
  };
}

function mapDispatchToProps(dispatch) {
  return {
    displayHelp: () => { dispatch(UserAction.help('off')); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
