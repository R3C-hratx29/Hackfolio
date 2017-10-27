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
  Button
} from 'grommet';

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
        website: '',
        images: [],
      }
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.updateBounty = this.updateBounty.bind(this);
  }

  saveChanges() { this.props.saveChanges(this.state.bounty); }
  /* saveChanges() {
   *   this.props.saveChanges({
   *     bounty_title: this.state.bounty.bounty_title,
   *     description: this.state.bounty.description,
   *     price: this.state.bounty.price,
   *     tech_stack: this.state.bounty.tech_stack,
   *     github: this.state.bounty.github,
   *     website: this.state.bounty.website,
   *     images: this.state.bounty.images
   *   });
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
        className="AddBounty"
        closer
        onClose={this.props.hideBountyLayerFunction}
        hidden={this.props.hidden}
      >
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
            <FormField label="Link to your website">
              <TextInput
                value={this.state.bounty.website}
                onDOMChange={e => {
                    this.updateBounty({ website: e.target.value });
                }}
                placeholder="website link"
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

export default AddBountyCardLayer;
