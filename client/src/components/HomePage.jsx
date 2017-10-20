import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tip from 'grommet/components/Tip';
import LandingPage from './LandingPage';
import * as UserAction from '../actions/UserActions';

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
        { this.props.user ?
          <div id="Home">
            Home
          </div> : <LandingPage />
        }
      </div>
    );
  }
}

HomePage.defaultProps = {
  help: 'off',
  user: {}
};

HomePage.propTypes = {
  help: PropTypes.string,
  user: PropTypes.shape({ jwt: PropTypes.string, username: PropTypes.string }),
  displayHelp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    help: state.help.text,
    user: state.currentUser.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayHelp: () => dispatch(UserAction.help('Search'))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
