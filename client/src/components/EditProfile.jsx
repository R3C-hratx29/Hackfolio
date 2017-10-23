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
  Heading
} from 'grommet';

// Grommet Icons
import {
  ImageIcon,
  SaveIcon,
  SocialGithubIcon,
  SocialFacebookOptionIcon,
  SocialLinkedinIcon,
  SocialTwitterIcon
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
          profile_id: '', link: '', title: 'github', icon:  '<SocialGithubIcon />'
        },
        {
          profile_id: '', link: '', title: 'twitter', icon: '<SocialTwitterIcon/>'
        },
        {
          profile_id: '', link: '', title: 'linkedIn', icon: '<SocialLinkedinIcon />'
        },
        {
          profile_id: '', link: '', title: 'facebook', icon: '<SocialFacebookOptionIcon />'
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
    let socialLinksCopy = this.state.socialLinks.slice();
    socialLinksCopy[0].link = e.target.value;
    this.setState({
      socialLinks: socialLinksCopy
    });
  }

  updateLinkedIn(e) {
    let socialLinksCopy = this.state.socialLinks.slice();
    socialLinksCopy[1].link = e.target.value;
    this.setState({
      socialLinks: socialLinksCopy
    });
  }

  updateTwitter(e) {
    let socialLinksCopy = this.state.socialLinks.slice();
    socialLinksCopy[2].link = e.target.value;
    this.setState({
      socialLinks: socialLinksCopy
    });
  }

  updateFacebook(e) {
    let socialLinksCopy = this.state.socialLinks.slice();
    socialLinksCopy[3].link = e.target.value;
    this.setState({
      socialLinks: socialLinksCopy
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
          profile_id: this.state.socialLinks[0].profile_id,
          link: this.state.socialLinks[0].link,
          title: this.state.socialLinks[0].title,
          icon: this.state.socialLinks[0].icon
        },
        {
          profile_id: this.state.socialLinks[1].profile_id,
          link: this.state.socialLinks[1].link,
          title: this.state.socialLinks[1].title,
          icon: this.state.socialLinks[1].icon
        },
        {
          profile_id: this.state.socialLinks[2].profile_id,
          link: this.state.socialLinks[2].link,
          title: this.state.socialLinks[2].title,
          icon: this.state.socialLinks[2].icon
        },
        {
          profile_id: this.state.socialLinks[3].profile_id,
          link: this.state.socialLinks[3].link,
          title: this.state.socialLinks[3].title,
          icon: this.state.socialLinks[3].icon
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
                value={this.state.socialLinks[0].link}
                placeholder="github"
              />
            </FormField>
            <FormField label="your LinkedIn profile">
              <TextInput
                onDOMChange={this.updateLinkedIn}
                value={this.state.socialLinks[1].link}
                placeholder="linkedin"
              />
            </FormField>
            <FormField label="Your Twitter profile">
              <TextInput
                onDOMChange={this.updateTwitter}
                value={this.state.socialLinks[2].link}
                placeholder="twitter"
              />
            </FormField>
            <FormField label="your Facebook profile">
              <TextInput
                onDOMChange={this.updateFacebook}
                value={this.state.socialLinks[3].link}
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
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
