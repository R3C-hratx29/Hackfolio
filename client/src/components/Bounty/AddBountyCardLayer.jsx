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

    this.state = {};
  }
  render() {
    return (
      <Layer
        onClose={this.props.hideBountyLayerFunction}
        hidden={this.props.hidden}
        closer
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
              label="so this is a form"
            >
              <TextInput
                placeholder="form"
              />
            </FormField>
            <FormField
              label="so this is a form"
            >
              <TextInput
                placeholder="form"
              />
            </FormField>
            <FormField
              label="so this is a form"
            >
              <TextInput
                placeholder="form"
              />
            </FormField>
            <FormField
              label="so this is a form"
            >
              <TextInput
                placeholder="form"
              />
            </FormField>
            <FormField
              label="so this is a form"
            >
              <TextInput
                placeholder="form"
              />
            </FormField>
          </Form>
        </Box>
      </Layer>
    );
  }
}
export default AddBountyCardLayer;
