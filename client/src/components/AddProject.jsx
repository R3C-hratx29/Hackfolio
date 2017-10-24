/*  eslint no-underscore-dangle: "error"  */
import React from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'react-firebase-file-uploader';
import $ from 'jquery';
import { connect } from 'react-redux';

// Grommet Components
import {
  Box,
  Layer,
  Form,
  FormField,
  TextInput,
  Header,
  Heading,
  Menu,
  Anchor,
  Split,
  Button,
} from 'grommet';

// Grommet Icons
import ImageIcon from 'grommet/components/icons/base/Image';
import Spinning from 'grommet/components/icons/Spinning';

// Custom Components
import ProjectCard from './ProjectCard';

// Custom Actions
import { saveProject, deleteProject } from '../actions/ProjectActions';

// Firebase
import firebase from '../data/firebase';

// Component Styles
import '../styles/AddProject.scss';

class AddProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {
        title: '',
        description: '',
        github_link: '',
        website_link: '',
        images: '',
        stack: '',
      },
      uploading: false,
    };

    this.updateProject = this.updateProject.bind(this);
    this.addImageURL = this.addImageURL.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        project: nextProps.edit,
      });
    } else {
      this.setState({
        project: {
          title: '',
          description: '',
          github_link: '',
          website_link: '',
          images: '',
          stack: '',
        }
      });
    }
  }

  onSave() {
    this.props.saveProject(this.state.project);
    this.props.toggleProjectModal();
  }

  onDelete() {
    this.props.deleteProject(this.state.project.id);
    this.props.toggleProjectModal();
  }

  onImageUpload(file) {
    this.ProjectMenuRef.setState({ state: 'collapsed' });
    firebase
      .storage()
      .ref('images')
      .child(file)
      .getDownloadURL()
      .then(url => {
        this.addImageURL(url);
        this.setState({ uploading: false });
      });
  }

  onUploadStart() {
    this.setState({ uploading: true });
  }

  addImageURL(url = '') {
    const array = this.state.project.images.split(',');
    array.push(url);
    this.updateProject({
      images: array.join(','),
    });
    setTimeout(() => {
      $(this.formScrollRef).animate({ scrollTop: this.formScrollRef.scrollHeight });
    }, 10);
  }

  removeImage(index) {
    const array = this.state.project.images.split(',');
    array.splice(index, 1);
    this.updateProject({
      images: array.join(','),
    });
  }

  updateImages(index, url) {
    const array = this.state.project.images.split(',');
    array[index] = url;
    this.updateProject({
      images: array.join(','),
    });
  }

  updateProject(state) {
    this.setState({
      project: Object.assign({}, this.state.project, state),
    });
  }

  updateStack(stack) {
    this.updateProject({
      stack
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
        <Box direction="row" responsive={false} pad={{ vertical: 'large' }}>
          <Split showOnResponsive="both">
            <Box size="medium">
              <ProjectCard project={this.state.project} />
            </Box>
            <Form>
              <Header justify="between">
                <Heading>{this.props.edit ? 'Edit Project' : 'Add Project'}</Heading>
                <Menu
                  responsive
                  icon={<ImageIcon />}
                  label="Add Image"
                  inline={false}
                  reverse
                  ref={ref => {
                    this.ProjectMenuRef = ref;
                  }}
                >
                  <Anchor onClick={() => this.addImageURL('')}>Image URL</Anchor>
                  <Anchor
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <label htmlFor="firebaseUpload" style={{ cursor: 'pointer' }}>
                      {this.state.uploading && <Spinning />} Upload Image
                      <FileUploader
                        style={{ display: 'none' }}
                        hidden
                        id="firebaseUpload"
                        accept="image/*"
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.onUploadStart}
                        onUploadSuccess={this.onImageUpload}
                      />
                    </label>
                  </Anchor>
                </Menu>
              </Header>
              <div
                className="formScroll"
                ref={ref => {
                  this.formScrollRef = ref;
                }}
              >
                <FormField label="Title">
                  <TextInput
                    value={this.state.project.title}
                    onDOMChange={e => {
                      this.updateProject({ title: e.target.value });
                    }}
                  />
                </FormField>
                <FormField label="Description">
                  <TextInput
                    value={this.state.project.description}
                    onDOMChange={e => {
                      this.updateProject({ description: e.target.value });
                    }}
                  />
                </FormField>
                <FormField label="Website Link">
                  <TextInput
                    value={this.state.project.website_link}
                    onDOMChange={e => {
                      this.updateProject({ website_link: e.target.value });
                    }}
                  />
                </FormField>
                <FormField label="Github Link">
                  <TextInput
                    value={this.state.project.github_link}
                    onDOMChange={e => {
                      this.updateProject({ github_link: e.target.value });
                    }}
                  />
                </FormField>
                <FormField label="Stack">
                  <TextInput
                    value={this.state.project.stack}
                    placeHolder="Separate with commas"
                    onDOMChange={e => {
                      this.updateStack(e.target.value);
                    }}
                  />
                </FormField>
                {this.state.project.images.split(',').map((image, index) => {
                  const i = index;
                  return (
                    <FormField
                      key={i}
                      label={
                        <div>
                          <span>Image #{index + 1}</span>
                          <span
                            tabIndex={0}
                            className="deleteImage"
                            onClick={() => this.removeImage(index)}
                            onKeyPress={() => {}}
                            role="button"
                          >
                            Delete
                          </span>
                        </div>
                      }
                    >
                      <TextInput
                        value={image}
                        onDOMChange={e => {
                          this.updateImages(index, e.target.value);
                        }}
                      />
                    </FormField>
                  );
                })}
              </div>
              <Box direction="row">
                {this.props.edit && (
                  <Button critical fill onClick={this.onDelete} label="Delete Project" />
                )}
                <Button primary fill onClick={this.onSave} label="Save Project" />
              </Box>
            </Form>
          </Split>
        </Box>
      </Layer>
    );
  }
}

AddProject.defaultProps = {
  edit: null,
};

AddProject.propTypes = {
  toggleProjectModal: PropTypes.func.isRequired,
  hideProjectModal: PropTypes.bool.isRequired,
  saveProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  edit: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => {
  return {
    saveProject: project => dispatch(saveProject(project)),
    deleteProject: id => dispatch(deleteProject(id)),
  };
};

const mapStateToProps = state => {
  return {
    user: state.currentUser.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
