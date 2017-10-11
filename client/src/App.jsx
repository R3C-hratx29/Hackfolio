/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import App from 'grommet/components/App';
import ProfileBox from './ProfileBox.jsx';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Label from 'grommet/components/Label';
import { connect } from 'react-redux';

class Hackfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false
    };
  }

  render() {
    if (this.state.test) {
      console.log('blah');
    }
    return (
      <App className="App">
        <Header
          fixed={false}
          float={false}
          splash={false}
        >
          <Title>
            Hackfolio
          </Title>
          <Box
            flex={true}
            justify="end"
            direction="row"
            responsive={false}
          >
            <Search
              inline={true}
              fill={true}
              size="medium"
              placeHolder="Search"
              dropAlign={{ right: 'right' }}
            />
            <Menu
              icon={<MenuIcon />}
              dropAlign={{ right: 'right' }}
            >
              <Anchor
                href="#"
                className="active"
              >
                First
              </Anchor>
              <Anchor href="#">
                Second
              </Anchor>
              <Anchor href="#">
                Third
              </Anchor>
            </Menu>
          </Box>
        </Header>
        <Heading>
            Rhiannon Le Parmentier
        </Heading>
        <Label>
            Software Engineer & Austrian Beer Maid
        </Label>
        <div>
            <ProfileBox />
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  console.log('my state: ', state);
  return {
    initialState: state.initialState
  };
}

export default connect(mapStateToProps)(Hackfolio);
