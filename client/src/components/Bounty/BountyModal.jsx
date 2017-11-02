import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layer } from 'grommet';
import BountyCard from './BountyCard';

const BountyModal = (props) => (
  <Layer closer onClose={props.close}>
    { props.bounty.bounty_id > 0 ?
      <BountyCard bounty={props.bounty} /> : <div />
    }
  </Layer>
);

BountyModal.propTypes = {
  bounty: PropTypes.shape({
    bounty_id: PropTypes.number
  }).isRequired,
  close: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    bounty: state.bounty
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BountyModal);
