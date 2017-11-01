import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Grommet Components
import {
  Tiles,
} from 'grommet';

// Custom Components
import * as BountyAction from '../../actions/BountyActions';
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

  componentDidMount() {
    this.props.getBounties();
    if (window.localStorage.token) {
      this.props.getFavorites();
    }
  }

  // editBounty(bounty) {
  //   this.setState({
  //     // hideBountyModal: false,
  //     // edit: bounty,
  //   });
  // }

  render() {
    const bounties = this.props.bounties.map((bounty) => {
      return <BountyCard key={bounty.bounty_id} bounty={bounty} />;
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
  bounties: PropTypes.arrayOf(PropTypes.object),
  getBounties: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    bounties: state.bounties
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBounties: () => dispatch(BountyAction.getBounties()),
    getFavorites: () => dispatch(BountyAction.getFavorites())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BountyContainer);
