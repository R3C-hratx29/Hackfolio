/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Search from 'grommet/components/Search';
import MenuIcon from 'grommet/components/icons/base/Menu';

const NavBar = () => (

  <Header
    fixed={false}
    float={false}
    splash={false}
  >
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
);

export default NavBar;
