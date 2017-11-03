import React from 'react';
import FileUploader from 'react-firebase-file-uploader';
import $ from 'jquery';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

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
import './../../styles/AddProject.scss';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        bounty: nextProps.edit,
      });
    } else {
      this.setState({
        bounty: {
          title: '',
          description: '',
          price: 0,
          stack: '',
          github: '',
          images: '',
        }
      });
    }
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

  /* onDelete() {
   *   this.props.deleteBounty(this.state.bounty.id);
   *   this.props.toggleBountyLayer();
   * }
   */
  updateBounty(state) {
    this.setState({
      bounty: Object.assign({}, this.state.bounty, state)
    });
  }

  render() {
    return (
      <Layer
        className="AddProject"
        closer
        onClose={this.props.hideBountyLayer}
        hidden={this.props.hidden}
      >
        <Box direction="row" pad={{ vertical: 'large' }}>
          <Form>
            <Header justify="between">
              <Heading>{this.props.edit ? 'Edit Bounty' : 'Add Bounty'}</Heading>
              <Menu
                responsive
                icon={<ImageIcon />}
                label="Add Image"
                inline={false}
                reverse
                ref={ref => {
                    this.menuRef = ref;
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
                  value={this.state.bounty.price.toString()}
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
            <Box direction="row">
              {this.props.edit && (
              <Button critical fill onClick={this.onDelete} label="Delete Bounty" />
              )}
              <Button primary fill onClick={this.saveChanges} label="Save Bounty" />
            </Box>
          </Form>
        </Box>
      </Layer>
    );
  }
}

AddBountyCardLayer.defaultProps = {
  edit: null,
};

AddBountyCardLayer.propTypes = {
  edit: propTypes.shape({}),
  hideImageURL: propTypes.func.isRequired,
  imageURLHidden: propTypes.func.isRequired,
  postBounty: propTypes.func.isRequired,
  hideBountyLayer: propTypes.func.isRequired,
  hidden: propTypes.func.isRequired,

};
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
