/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
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
  SaveIcon,
} from 'grommet/components/icons/base';

import Spinning from 'grommet/components/icons/Spinning';

import { changeProfile } from './../actions/ProfileActions';
// Component Styles
import './../styles/ProjectCard.scss';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic_url: null,
      uploading: false,
      name: '',
      profession: '',
      socialLinks: [
        {
          profile_id: '', link: '', title: 'github', icon: ''
        },
        {
          profile_id: '', link: '', title: 'twitter', icon: ''
        },
        {
          profile_id: '', link: '', title: 'linkedIn', icon: ''
        },
        {
          profile_id: '', link: '', title: 'facebook', icon: ''
        }
      ]
    };

    this.updateName = this.updateName.bind(this);
    this.updateProfession = this.updateProfession.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.updateGithub = this.updateGithub.bind(this);
    this.updateLinkedIn = this.updateLinkedIn.bind(this);
    this.updateTwitter = this.updateTwitter.bind(this);
    this.updateFacebook = this.updateFacebook.bind(this);
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
    console.log(this.state.socialLinks[0].title);
    const socialLinksCopy = this.state.socialLinks.slice();
    socialLinksCopy[0].link = e.target.value;
    this.setState({
      socialLinks: socialLinksCopy
    });
  }

  updateLinkedIn(e) {
    this.setState({
      linkedIn: e.target.value
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
      profile_pic: this.state.profile_pic_url,
      name: this.state.name,
      profession: this.state.profession,
      bio: this.state.bio,
      socialLinks: [
        {
          profile_id: this.state.profile_id,
          link: this.state.github,
          title: this.state.title,
          icon: this.state.icon
        },
        {
          profile_id: this.state.profile_id,
          link: this.state.linkedin,
          title: this.state.title,
          icon: this.state.icon
        },
        {
          profile_id: this.state.profile_id,
          link: this.state.twitter,
          title: this.state.title,
          icon: this.state.icon
        },
        {
          profile_id: this.state.profile_id,
          link: this.state.facebook,
          title: this.state.title,
          icon: this.state.icon
        }
      ]
    }, this.props.userProfile);
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
              onClick={this.saveChanges}
            />
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
  console.log(state.userProfile);
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
