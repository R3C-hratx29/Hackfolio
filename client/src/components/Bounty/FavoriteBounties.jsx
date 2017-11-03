import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Grommet Components
import { Tiles } from 'grommet';

// Custom Components
import * as BountyAction from '../../actions/BountyActions';
import BountyCard from './BountyCard';

import './../../styles/BountyContainer.scss';

class BountyContainer extends React.Component {
  componentDidMount() {
    this.props.getBounties();
    this.props.getFavorites();
  }
  render() {
    const bounties = this.props.bounties
      .filter(bounty => this.props.favorites.includes(bounty.bounty_id))
      .map(bounty => {
        return <BountyCard key={bounty.bounty_id} bounty={bounty} showSend />;
      });
    return (
      <div>
        <Tiles flush={false} justify="start">
          {bounties}
        </Tiles>
      </div>
    );
  }
}

BountyContainer.defaultProps = {
  bounties: [],
};

BountyContainer.propTypes = {
  bounties: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  getBounties: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    bounties: state.bounties,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => dispatch(BountyAction.getFavorites()),
    getBounties: () => dispatch(BountyAction.getBounties()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BountyContainer);
