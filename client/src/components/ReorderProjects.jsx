import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Reorder, {
  reorder
} from 'react-reorder';

// Grommet Components
import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

// Custom Styles
import '../styles/ReorderProjects.scss';

class ReorderProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.userProfile.projects
    };

    this.onReorder = this.onReorder.bind(this);
  }

  onReorder(event, previousIndex, nextIndex) {
    const newProjects = reorder(this.state.projects, previousIndex, nextIndex);

    this.setState({
      projects: newProjects
    });
  }

  render() {
    return (
      <Layer
        className="ReorderProjects"
        closer
        onClose={this.props.toggleReorderModal}
        hidden={this.props.hideReorderModal}
      >
        <List>
          <Reorder
            reorderId="projects"
            component="div"
            onReorder={this.onReorder}
          >
            {
              this.state.projects.map((project) => (
                <ListItem key={project.id} justify="between">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${project.images[0]})`,
                    }}
                  />
                  <span>{project.title}</span>
                </ListItem>
              ))
            }
          </Reorder>
        </List>
      </Layer>
    );
  }
}

ReorderProjects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
  toggleReorderModal: PropTypes.func.isRequired,
  hideReorderModal: PropTypes.bool.isRequired,
};

ReorderProjects.defaultProps = {
  userProfile: {},
};


function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps)(ReorderProjects);
