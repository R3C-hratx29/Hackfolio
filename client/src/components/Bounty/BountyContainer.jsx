import React from 'react';
import AddBountyTile from './AddBountyTile';
import EditBountyCardLayer from './EditBountyCardLayer';

class BountyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        BountyContainer
        <AddBountyTile />
        <EditBountyCardLayer />
      </div>
    );
  }
}

export default BountyContainer;
