import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tip from 'grommet/components/Tip';
import * as UserAction from './../actions/UserActions';
import BountyContainer from './Bounty/BountyContainer';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ help: true });
    }, 500);
  }
  render() {
    return (
      <div>
        { this.props.help === 'Home' && this.state.help ?
          <Tip
            target="Home"
            onClose={this.props.displayHelp}
          >
          something about a homepage (maybe cats)
          </Tip> : <div />
        }
        <BountyContainer />
      </div>
    );
  }
}

HomePage.defaultProps = {
  help: 'off'
};

HomePage.propTypes = {
  help: PropTypes.string,
  displayHelp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    help: state.help
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayHelp: () => dispatch(UserAction.help('Search'))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
