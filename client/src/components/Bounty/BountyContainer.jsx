import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Grommet Components
// import {
//   // Tiles,
//   // Box,
//   // Button
// } from 'grommet';

// Custom Components
import AddBountyTile from './AddBountyTile';
import EditBountyCardLayer from './EditBountyCardLayer';
import BountyCard from './BountyCard';

import './../../styles/BountyContainer.scss';

class BountyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // hideBountyModal: true,
      // edit: null,
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        // help: true,
      });
    }, 500);
  }

  editBounty(bounty) {
    this.setStat({
      hideBountyModal: false,
      edit: bounty,
    });
  }

  render() {
    return (
      <div>
        BountyContainer
        <BountyCard />
        <AddBountyTile />
        <EditBountyCardLayer />
      </div>
    );
  }
}

export default BountyContainer;
