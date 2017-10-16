import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';

// Custom Components
import ProjectCard from './ProjectCard';

// Component Styles
import './../styles/ProjectCard.scss';

class AddProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {
        title: '',
        description: '',
        github_link: '',
        website_link: '',
        images: [],
        stack: [],
      }
    };

    this.updateProject = this.updateProject.bind(this);
  }

  updateProject(state) {
    this.setState({
      project: Object.assign(
        {},
        this.state.project,
        state,
      )
    });
  }

  render() {
    return (
      <Layer closer onClose={this.props.toggleProjectModal} hidden={this.props.hideProjectModal}>
        <Box direction="row" responsive={false} pad={{ horizontal: 'large', vertical: 'large', between: 'large' }}>
          <ProjectCard project={this.state.project} />
          <Form>
            <Header>
              <Heading>
                Add a Project
              </Heading>
            </Header>
            <FormField label="Title">
              <TextInput
                onDOMChange={
                  (e) => {
                    this.updateProject({ title: e.target.value });
                  }
                }
              />
            </FormField>
            <FormField label="Description">
              <TextInput
                onDOMChange={
                  (e) => {
                    this.updateProject({ description: e.target.value });
                  }
                }
              />
            </FormField>
          </Form>
        </Box>
      </Layer>
    );
  }
}

AddProject.propTypes = {
  toggleProjectModal: PropTypes.func.isRequired,
  hideProjectModal: PropTypes.bool.isRequired,
};

export default AddProject;
