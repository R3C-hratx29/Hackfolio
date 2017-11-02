/* eslint-disable react/prop-types */
import React from 'react';
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
  Button,
  Anchor,
  Menu,
} from 'grommet';

// Grommet Icons
import {
  CheckmarkIcon,
  ImageIcon,
} from 'grommet/components/icons/base';

import Spinning from 'grommet/components/icons/Spinning';

// Custom Actions
import { postBounty } from './../../actions/BountyActions';

// Firebase
import firebase from './../../data/firebase';

// Component Styles
import './../../styles/ProjectCard.scss';

class AddBountyCardLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounty: {
        title: '',
        description: '',
        price: 0,
        stack: '',
        github: '',
        images: '',
      },
      uploading: false
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.updateBounty = this.updateBounty.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.addImageURL = this.addImageURL.bind(this);
    this.toggleImageURL = this.toggleImageURL.bind(this);
  }

  onImageUpload(file) {
    this.menuRef.setState({ state: 'collapsed' });
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
    const array = this.state.bounty.images.split(',');
    array.push(url);
    this.updateBounty({
      images: array.join(','),
    });
    setTimeout(() => {
      $(this.formScrollRef).animate({ scrollTop: this.formScrollRef.scrollHeight });
    }, 10);
  }

  removeImage(index) {
    const array = this.state.bounty.images.split(',');
    array.splice(index, 1);
    this.updateBounty({
      images: array.join(','),
    });
  }

  updateImages(index, url) {
    const array = this.state.bounty.images.split(',');
    array[index] = url;
    this.updateBounty({
      images: array.join(','),
    });
  }

  toggleImageURL() {
    this.props.hideImageURL();
  }

  saveChanges() {
    this.props.postBounty(this.state.bounty);
    this.props.hideBountyLayer();
  }

  updateBounty(state) {
    this.setState({
      bounty: Object.assign({}, this.state.bounty, state)
    });
  }

  render() {
    return (
      <Layer
        className="AddBounty"
        closer
        onClose={this.props.hideBountyLayer} hidden={this.props.hidden}
      >
        <Layer
          className="ImageURL"
          flush
          hidden={this.props.imageURLHidden}
          closer
          onClose={this.props.hideImageURL}
        >
          <Box
            size={{ width: 'large' }}
            pad={{ horizontal: 'medium', between: 'small', vertical: 'medium' }}
          >
            <h4>Enter your image URL below.</h4>
            <FormField>
              <TextInput
                onDOMChange={this.updateProfilePic}
                value={this.state.profile_pic}
                placeHolder="Image URL"
              />
            </FormField>
            <Anchor
              icon={<CheckmarkIcon />}
              label="Submit"
              align="center"
              onClick={this.saveProfilePic}
            />
          </Box>
        </Layer>
        <Box direction="row" pad={{ vertical: 'large' }}>
          <Form>
            <Header justify="between">
              <Heading>Add a bounty</Heading>
              <Menu
                responsive
                icon={<ImageIcon />}
                label="Add Image"
                inline={false}
                reverse
                ref={ref => {
                    this.menuRef = ref
                }}
              >
                <Anchor onClick={() => this.addImageURL('')}>Image URL</Anchor>
                <Anchor onClick={e => {
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
            <FormField label="Give your bounty a name">
              <TextInput
                value={this.state.bounty.title}
                onDOMChange={e => {
                    this.updateBounty({ title: e.target.value });
                }}
                placeholder="bounty name"
              />
            </FormField>
            <FormField label="Describe the task you want help completing">
              <TextInput
                value={this.state.bounty.description}
                onDOMChange={e => {
                    this.updateBounty({ description: e.target.value });
                }}
                placeholder="bounty description"
              />
            </FormField>
            <FormField label="Name your price: how much are you offering to complete this task?">
              <TextInput
                value={this.state.bounty.price}
                onDOMChange={e => {
                    this.updateBounty({ price: e.target.value });
                }}
              />
            </FormField>
            <FormField label="List the tech stack that developers will need to complete the task">
              <TextInput
                value={this.state.bounty.stack}
                onDOMChange={e => {
                    this.updateBounty({ stack: e.target.value });
                }}
                placeholder="tech stack"
              />
            </FormField>
            <FormField label="Link to your github if this isn't a brand new project">
              <TextInput
                value={this.state.bounty.github}
                onDOMChange={e => {
                    this.updateBounty({ github: e.target.value });
                }}
                placeholder="github link"
              />
            </FormField>
            <FormField>
              {this.state.bounty.images.split(',').map((image, index) => {
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
            </FormField>
            </div>
            <Box>
              <Button primary fill onClick={this.saveChanges} label="Save Bounty" />
            </Box>
          </Form>
        </Box>
      </Layer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postBounty: bounty => dispatch(postBounty(bounty))
  };
};

const mapStateToProps = (state) => {
  return {
    bounty: state.bounty
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBountyCardLayer);
