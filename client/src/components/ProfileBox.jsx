/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
/* import PropTypes from 'prop-types'; */

// Grommet Components
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Tile from 'grommet/components/Tile';
import Image from 'grommet/components/Image';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import Anchor from 'grommet/components/Anchor';
// Grommet Icons
import EditIcon from 'grommet/components/icons/base/Edit'; // <EditIcon />
import SaveIcon from 'grommet/components/icons/base/Save';

import SocialIcons from './SocialIcons';
import { changeProfile } from './../actions/ProfileActions';

class ProfileBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: this.props.userProfile.name,
      profession: this.props.userProfile.profession,
      bio: this.props.userProfile.bio
    };
    this.editMe = this.editMe.bind(this);
    this.updateProfession = this.updateProfession.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateBio = this.updateBio.bind(this);
  }

  editMe() {
    this.setState({
      edit: !this.state.edit
    });

    this.props.saveChanges({
      name: this.state.name,
      profession: this.state.profession,
      bio: this.state.bio
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

  render() {
    const descriptionBox = this.state.edit ?
      (
        <Form>
          <FormField label="your name">
            <TextInput
              onDOMChange={this.updateName}
              value={this.state.name}
              placeHolder="update your name"
            />
          </FormField>
          <FormField label="your professional title">
            <TextInput
              onDOMChange={this.updateProfession}
              value={this.state.profession}
              placeHolder="your professional title"
            />
          </FormField>
          <FormField label="your bio">
            <TextInput
              onDOMChange={this.updateBio}
              value={this.state.bio}
              placeHolder="update your bio here"
            />
          </FormField>
        </Form>
      ) : (
        <div>
          <Heading tag="h3">
            {this.props.userProfile.profession}
          </Heading>
          {this.props.userProfile.bio}
        </div>
      );

    return (
      <Tile
        full={false}
      >
        <Image
          size="medium"
          style={{ maxWidth: 384, maxHeight: 280 }}
          src={this.props.userProfile.profile_pic}
        />
        <Card
          heading={this.state.edit ? ' ' : this.props.userProfile.name}
          contentPad="medium"
          description={descriptionBox}
        />
        <Box
          direction="row"
          justify="between"
          style={{ minWidth: 384 }}
          responsive={false}
        >
          <SocialIcons />
          <Anchor
            icon={this.state.edit ? <SaveIcon /> : <EditIcon />}
            onClick={this.editMe}
          />
        </Box>
      </Tile>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
