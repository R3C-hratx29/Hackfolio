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
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Split from 'grommet/components/Split';

// Grommet Icons
import ImageIcon from 'grommet/components/icons/base/Image';

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
    this.addImageURL = this.addImageURL.bind(this);
    this.updateImages = this.updateImages.bind(this);
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

  updateStack(stack) {
    const array = stack.split(',').map((item) => {
      return item.trim();
    });
    this.updateProject({
      stack: array
    });
  }

  addImageURL() {
    const array = this.state.project.images;
    array.push('');
    this.updateProject({
      images: array
    });
  }

  updateImages(index, url) {
    const array = this.state.project.images;
    array[index] = url;
    this.updateProject({
      images: array
    });
  }

  render() {
    return (
      <Layer
        className="AddProject"
        closer
        onClose={this.props.toggleProjectModal}
        hidden={this.props.hideProjectModal}
      >
        <Box direction="row" responsive={false} pad="large">
          <Split showOnResponsive="both">
            <ProjectCard className="left" project={this.state.project} />
            <Form className="right">
              <Header
                justify="between"
              >
                <Heading>
                  Add a Project
                </Heading>
                <Menu
                  responsive
                  icon={<ImageIcon />}
                  label="Add Image"
                  inline={false}
                  reverse
                >
                  <Anchor
                    onClick={this.addImageURL}
                  >
                    Image URL
                  </Anchor>
                  <Anchor
                    onClick={() => {}}
                  >
                    Upload Image
                  </Anchor>
                </Menu>
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
              <FormField label="Website Link">
                <TextInput
                  onDOMChange={
                    (e) => {
                      this.updateProject({ website_link: e.target.value });
                    }
                  }
                />
              </FormField>
              <FormField label="Github Link">
                <TextInput
                  onDOMChange={
                    (e) => {
                      this.updateProject({ github_link: e.target.value });
                    }
                  }
                />
              </FormField>
              <FormField label="Stack">
                <TextInput
                  placeHolder="Separate with commas"
                  onDOMChange={
                    (e) => {
                      this.updateStack(e.target.value);
                    }
                  }
                />
              </FormField>
              {
                this.state.project.images.map((image, index) => {
                  const i = index;
                  return (
                    <FormField key={i} label={`Image #${index + 1}`}>
                      <TextInput
                        onDOMChange={
                          (e) => {
                            this.updateImages(index, e.target.value);
                          }
                        }
                      />
                    </FormField>
                  );
                })
              }
            </Form>
          </Split>
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
