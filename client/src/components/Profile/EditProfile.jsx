/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable */
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
  Heading,
  Button
} from 'grommet';

// Grommet Icons
import {
  ImageIcon,
  SaveIcon,
  SocialGithubIcon,
  SocialFacebookOptionIcon,
  SocialLinkedinIcon,
  SocialTwitterIcon,
  DocumentUserIcon,
  CheckmarkIcon
} from 'grommet/components/icons/base';

import Spinning from 'grommet/components/icons/Spinning';

import { changeProfile } from './../../actions/ProfileActions';
// Component Styles
import './../../styles/ProjectCard.scss';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic_url: null,
      uploading: false,
      name: '',
      profession: '',
      github: '',
      twitter: '',
      facebook: '',
      linked_in: '',
      resume: ''
    };

    this.updateName = this.updateName.bind(this);
    this.updateProfession = this.updateProfession.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateGithub = this.updateGithub.bind(this);
    this.updateLinkedIn = this.updateLinkedIn.bind(this);
    this.updateTwitter = this.updateTwitter.bind(this);
    this.updateFacebook = this.updateFacebook.bind(this);
    this.updateResume = this.updateResume.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.toggleImageURL = this.toggleImageURL.bind(this);
    this.saveProfilePic = this.saveProfilePic.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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

  updateProfilePic(e) {
    this.setState({
      profile_pic_url: e.target.value
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
      linked_in: e.target.value
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

  updateResume(e) {
    this.setState({
      resume: e.target.value
    });
  }

  saveProfilePic() {
    this.props.saveChanges({
      profile_pic: this.state.profile_pic_url,
      name: this.state.name,
      profession: this.state.profession,
      bio: this.state.bio,
      github: this.state.github,
      resume: this.state.resume,
      linked_in: this.state.linked_in,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
    }, this.props.userProfile);
    this.toggleImageURL()
  }

  saveChanges() {
    this.props.saveChanges({
      profile_pic: this.state.profile_pic_url,
      name: this.state.name,
      profession: this.state.profession,
      bio: this.state.bio,
      github: this.state.github,
      resume: this.state.resume,
      linked_in: this.state.linked_in,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
    }, this.props.userProfile);
    this.props.hideModal()
  }

  render() {
    return (
      <Layer
        className="EditProfile"
        hidden={this.props.hidden}
        closer onClose={this.props.hideModal}
      >
        <Layer
          className="ImageURL"
          flush={true}
          hidden={this.props.imageURLHidden}
          closer onClose={this.props.hideImageURL}
        >
        <Box
          size={{width:"large"}}
          pad={{horizontal:"medium", between:"small", vertical:"medium"}}
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
                <Anchor onClick={this.toggleImageURL}>
                  ImageURL
                </Anchor>
                <Anchor
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  <label
                    htmlFor="firebaseUpload"
                    style={{ cursor: 'pointer' }}
                  >
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
            <FormField label="your Github Profile">
              <TextInput
                onDOMChange={this.updateGithub}
                value={this.state.github}
                placeholder="github"
              />
            </FormField>
            <FormField label="your LinkedIn profile">
              <TextInput
                onDOMChange={this.updateLinkedIn}
                value={this.state.linked_in}
                placeholder="linkedin"
              />
            </FormField>
            <FormField label="your Twitter profile">
              <TextInput
                onDOMChange={this.updateTwitter}
                value={this.state.twitter}
                placeholder="twitter"
              />
            </FormField>
            <FormField label="your Facebook profile">
              <TextInput
                onDOMChange={this.updateFacebook}
                value={this.state.socialLinks}
                placeholder="facebook"
              />
            </FormField>
            <FormField label="your Resume">
              <TextInput
                onDOMChange={this.updateResume}
                value={this.state.socialLinks}
                placeholder="Résumé"
              />
            </FormField>
            <Box direction="row">
              <Button primary fill onClick={this.saveChanges} label="Save Profile" />
            </Box>
          </Form>
        </Box>
      </Layer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveChanges: (changes, profile) => dispatch(changeProfile(changes, profile))
  };
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
