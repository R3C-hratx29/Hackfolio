/* eslint-disable */
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
import AddBountyCardLayer from './AddBountyCardLayer';
import BountyCard from './BountyCard';

import './../../styles/BountyContainer.scss';

class BountyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideBountyLayer: true,
      hideImageURL: true,
      edit: null,
    };
    this.editBounty = this.editBounty.bind(this);
    this.toggleBountyToEdit = this.toggleBountyToEdit.bind(this);
  }

  componentDidMount() {
    this.props.getBounties();
    if (window.localStorage.token) {
      this.props.getFavorites();
    }
  }

  toggleBountyToEdit() {
    if (this.state.hideBountyLayer) {
      this.setState({
        edit: null,
      })
    }
    this.setState({
      hideBountyLayer: !this.state.hideBountyLayer
    });
  }

  editBounty(bounty) {
    this.setState({
      hideBountyLayer: false,
      edit: bounty,
    });
  }

  render() {
    const bounties = this.props.bounties.map((bounty) => {
      return <BountyCard
               key={bounty.bounty_id}
               bounty={bounty}
               showSend
               editBounty={this.editBounty}
               toggleEditLayer={this.toggleBountyToEdit}
             />;
    });
    return (
      <div>
        BountyContainer
        <Tiles flush={false} justify="between">
          {bounties}
        </Tiles>
        <AddBountyTile
          edit={this.state.edit}
          imageURLHidden={this.state.hideImageURL}
        />
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
