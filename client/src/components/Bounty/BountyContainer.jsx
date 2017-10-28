import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as BountyAction from '../../actions/BountyActions';

// Grommet Components
import {
  Tiles,
  Box,
  Button
} from 'grommet';

// Custom Components
import AddBountyTile from './AddBountyTile';
import EditBountyCardLayer from './EditBountyCardLayer';
import BountyCard from './BountyCard';

import './../../styles/BountyContainer.scss';

class BountyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideBountyModal: true,
      edit: null,
    };
  }

  componentDidMount() {
    this.props.getBounties();
  }

  editBounty(bounty) {
    this.setStat({
      hideBountyModal: false,
      edit: bounty,
    });
  }

  render() {
    const bounties = this.props.bounties.bounties
      .map((bounty, i) => {
        return <BountyCard key={i} bounty={bounty} />;
      });
    return (
      <div>
        BountyContainer
        <Tiles flush={false} justify="between">
          {bounties}
        </Tiles>
        <AddBountyTile />
        <EditBountyCardLayer />
      </div>
    );
  }
}

BountyContainer.defaultProps = {
  bounties: {
    bounties: []
  },
};

BountyContainer.propTypes = {
  bounties: PropTypes.shape({ bounties: PropTypes.array }),
  getBounties: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    bounties: state.bounties
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBounties: () => dispatch(BountyAction.getBounties())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BountyContainer);
