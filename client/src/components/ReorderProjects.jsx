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
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';

import { changeProjects } from '../actions/ProjectActions';

// Custom Styles
import '../styles/ReorderProjects.scss';

class ReorderProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.userProfile.projects,
      updatedOrder: []
    };

    this.onReorder = this.onReorder.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projects: nextProps.userProfile.projects
    });
  }

  onReorder(event, previousIndex, nextIndex) {
    const newProjects = reorder(this.state.projects, previousIndex, nextIndex);
    const updatedOrder = newProjects.map((project, index) => {
      return {
        id: project.id,
        order: index
      };
    });

    this.setState({
      projects: newProjects,
      updatedOrder
    });
  }

  onSave() {
    this.props.changeProjects(this.state.updatedOrder);
    this.props.toggleReorderModal();
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
          <Header
            direction="row"
            justify="between"
          >
            <Heading>
              Reorder Projects
            </Heading>
            <Button
              onClick={this.onSave}
              label="Save"
              primary
            />
          </Header>
          <Reorder
            reorderId="projects"
            component="ul"
            className="grommetux-list"
            onReorder={this.onReorder}
          >
            {
              this.state.projects.map((project) => (
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
