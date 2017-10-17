/*  eslint no-underscore-dangle: "error"  */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

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
import Spinning from 'grommet/components/icons/Spinning';

// Custom Components
import ProjectCard from './ProjectCard';

// Component Styles
import './../styles/ProjectCard.scss';

// Initalize Firebase
const config = {
  apiKey: 'AIzaSyDbSmVKg6UsDZFa2LHTqqm4Q9hPylorbao',
  authDomain: 'hackfolio-ed6a4.firebaseapp.com',
  databaseURL: 'https://hackfolio-ed6a4.firebaseio.com',
  projectId: 'hackfolio-ed6a4',
  storageBucket: 'hackfolio-ed6a4.appspot.com',
  messagingSenderId: '977473242483'
};
firebase.initializeApp(config);

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
      },
      uploading: false
    };

    this.updateProject = this.updateProject.bind(this);
    this.addImageURL = this.addImageURL.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  onImageUpload(file) {
    this.menuRef.setState({ state: 'collapsed' });
    firebase.storage().ref('images').child(file).getDownloadURL()
      .then(url => {
        this.addImageURL(url);
        this.setState({ uploading: false });
      });
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

  addImageURL(url = '') {
    const array = this.state.project.images;
    array.push(url);
    this.updateProject({
      images: array
    });
  }

  removeImage(index) {
    const array = this.state.project.images;
    array.splice(index, 1);
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
                  ref={ref => { this.menuRef = ref; }}
                >
                  <Anchor
                    onClick={() => this.addImageURL('')}
                  >
                    Image URL
                  </Anchor>
                  <Anchor
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <label htmlFor="firebaseUpload">
                      { this.state.uploading && <Spinning /> } Upload Image
                      <FileUploader
                        style={{ display: 'none' }}
                        hidden
                        id="firebaseUpload"
                        accept="image/*"
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={() => { this.setState({ uploading: true }); }}
                        onUploadSuccess={this.onImageUpload}
                      />
                    </label>
                  </Anchor>
                </Menu>
              </Header>
              <div className="formScroll">
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
              </div>
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
