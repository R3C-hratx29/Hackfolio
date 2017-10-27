/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Layer,
  Form,
  FormField,
  TextInput,
  Header,
  Heading,
} from 'grommet';

class AddBountyCardLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounty_title: '',
      description: '',
      price: '',
      tech_stack: '',
      github: '',
      website: '',
      images: [],
    };
  }
  saveChanges() {
    this.props.saveChanges({
      bounty_title: this.state.bounty_title,
      description: this.state.description,
      price: this.state.price,
      tech_stack: this.state.tech_stack,
      github: this.state.github,
      website: this.state.website,
      images: this.state.images
    });
  }

  render() {
    return (
      <Layer
        hidden={this.props.hidden}
        closer
        onClose={this.props.hideBountyLayerFunction}
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
                Add a bounty
              </Heading>
            </Header>
            <FormField
              label="Give your bounty a name"
            >
              <TextInput
                placeholder="bounty name"
              />
            </FormField>
            <FormField
              label="Describe the task you want help completing"
            >
              <TextInput
                placeholder="bounty description"
              />
            </FormField>
            <FormField
              label="Name your price: how much are you offering to complete this task?"
            >
              <TextInput
                placeholder="$$$"
              />
            </FormField>
            <FormField
              label="List the tech stack that developers will need to complete the task"
            >
              <TextInput
                placeholder="tech stack"
              />
            </FormField>
            <FormField
              label="Link to your github if this isn't a brand new project"
            >
              <TextInput
                placeholder="github link"
              />
            </FormField>
            <FormField
              label="Link to your website"
            >
              <TextInput
                placeholder="website link"
              />
            </FormField>
          </Form>
        </Box>
      </Layer>
    );
  }
}
export default AddBountyCardLayer;
