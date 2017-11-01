/* eslint-disable react/prop-types */
/* eslint-disable */
import React from 'react';
import FileUploader from 'react-firebase-file-uploader';
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
} from 'grommet';

import CheckmarkIcon from 'grommet/components/icons/base';

// Custom Actions
import { setBounty } from './../../actions/BountyActions';

// Firebase
import firebase from './../../data/firebase';

class AddBountyCardLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounty: {
        bounty_title: '',
        description: '',
        price: '',
        tech_stack: '',
        github: '',
        images: [],
      },
      uploading: false
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.updateBounty = this.updateBounty.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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
        this.setState({ uploading: false, profile_pic_url: url });
      });
  }

  onUploadStart() {
    this.setState({ uploading: true });
  }

  toggleImageURL() {
    this.props.hideImageURL();
  }

  saveChanges() {
    this.props.setBounty(this.state.bounty);
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
        onClose={this.props.hideBountyLayerFunction}
        hidden={this.props.hidden}
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
            <Header
              justify="between"
            >
              <Heading>
                Add a bounty
              </Heading>
            </Header>
            <FormField label="Give your bounty a name">
              <TextInput
                value={this.state.bounty.bounty_title}
                onDOMChange={e => {
                    this.updateBounty({ bounty_title: e.target.value });
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
                placeholder="$$$"
              />
            </FormField>
            <FormField label="List the tech stack that developers will need to complete the task">
              <TextInput
                value={this.state.bounty.tech_stack}
                onDOMChange={e => {
                    this.updateBounty({ tech_stack: e.target.value });
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
    saveChanges: (changes, bounty) => dispatch(setBounty(changes, bounty))
  };
};

const mapStateToProps = (state) => {
  return {
    bounty: state.bounty
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBountyCardLayer);
