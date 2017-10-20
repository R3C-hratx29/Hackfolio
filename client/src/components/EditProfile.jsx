/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

import {
  Layer,
  Form,
  FormField,
  TextInput,
  Box,
  Menu,
  Anchor,
  Header,
  Heading
} from 'grommet';

// Grommet Icons
import {
  ImageIcon,
  SaveIcon
} from 'grommet/components/icons/base';

import { changeProfile } from './../actions/ProfileActions';
// Component Styles
import './../styles/ProjectCard.scss';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      profession: '',
      bio: '',
      linkedin: '',
      twitter: '',
      facebook: '',
    };

    this.updateName = this.updateName.bind(this);
    this.updateProfession = this.updateProfession.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateGithub = this.updateGithub.bind(this);
    this.updateLinkedIn = this.updateLinkedIn.bind(this);
    this.updateTwitter = this.updateTwitter.bind(this);
    this.updateFacebook = this.updateFacebook.bind(this);
  }

  onImageUpload(file) {
    this.menuRef.setState({ state: 'collapsed' });
    firebase.storage().ref('images').child(file).getDownloadURL()
      .then(url => {
        this.addImageURL(url);
      });
  }

  updateProfession(e) {
    this.setState({
      profession: e.target.value
    });
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  updateBio(e) {
    this.setState({
      bio: e.target.value
    });
  }

  updateGithub(e) {
    this.setState({
      github: e.target.value
    });
  }

  updateLinkedIn(e) {
    this.setState({
      linkedin: e.target.value
    });
  }

  updateTwitter(e) {
    this.setState({
      twitter: e.target.value
    });
  }

  updateFacebook(e) {
    this.setState({
      facebook: e.target.value
    });
  }

  saveChanges() {
    this.props.saveChanges({
      name: this.state.name,
      profession: this.state.profession,
      bio: this.state.bio,
      github: this.state.github,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      facebook: this.state.facebook
    });
  }

  render() {
    return (
      <Layer
        className="EditProfile"
        hidden={this.props.hidden}
        closer
        onClose={this.props.hideModal}
      >
        <Box
          direction="row"
          pad={{ vertical: 'large' }}
        >
          <Form>
            <Header
              justify="between"
            >
              <Heading>
                Edit your profile
              </Heading>
              <Menu
                responsive
                icon={<ImageIcon />}
                label="Add Profile Picture"
                inline={false}
                reverse
                ref={ref => { this.menuRef = ref; }}
              >
                <Anchor>
                  Image URL
                </Anchor>
                <Anchor
                  onClick={(e) => { e.stopPropagaation(); }}
                >
                  <label
                    htmlFor="firebaseUpload"
                    style={{ cursor: 'pointer' }}
                  > Upload Image
                    <FileUploader
                      style={{ display: 'none' }}
                      hidden
                      id="firebaseUpload"
                      accept="image/*"
                      randomizeFilename
                      storageRef={firebase.storage().ref('images')}
                    />
                  </label>
                </Anchor>
              </Menu>
            </Header>
            <FormField label="your name">
              <TextInput
                onDOMChange={this.updateName}
                value={this.state.name}
                placeHolder={this.props.userProfile.name}
              />
            </FormField>
            <FormField label="your professional title">
              <TextInput
                onDOMChange={this.updateProfession}
                value={this.state.profession}
                placeHolder={this.props.userProfile.profession}
              />
            </FormField>
            <FormField label="your bio">
              <TextInput
                onDOMChange={this.updateBio}
                value={this.state.bio}
                placeHolder={this.props.userProfile.bio}
              />
            </FormField>
            <FormField label="Your Github Profile">
              <TextInput
                onDOMChange={this.updateGithub}
                value={this.state.github}
                placeholder="github"
              />
            </FormField>
            <FormField label="your LinkedIn profile">
              <TextInput
                onDOMChange={this.updateLinkedIn}
                value={this.state.linkedin}
                placeholder="linkedin"
              />
            </FormField>
            <FormField label="Your Twitter profile">
              <TextInput
                onDOMChange={this.updateTwitter}
                value={this.state.twitter}
                placeholder="twitter"
              />
            </FormField>
            <FormField label="your Facebook profile">
              <TextInput
                onDOMChange={this.updateFacebook}
                value={this.state.facebook}
                placeholder="facebook"
              />
            </FormField>
            <Anchor
              icon={<SaveIcon />}
              primary
              onClick={this.SaveChanges}
            />
          </Form>
        </Box>
      </Layer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveChanges: (changes) => dispatch(changeProfile(changes))
  };
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
