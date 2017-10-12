import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* eslint-disable react/jsx-boolean-value */
// Grommet Components
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

// Grommet Icons
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import GithubIcon from 'grommet/components/icons/base/SocialGithub';

// Component Styles
import './../styles/Projects.scss';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const projects = this.props.userProfile.projects.map((project) => (
      <Tile key={project.id}>
        <Card
          thumbnail="//cdn.dribbble.com/users/33073/screenshots/2425824/800.png"
          heading={project.title}
          description="Sample description providing more details."
          link={
            <Box
              direction="row"
              justify="between"
              responsive={false}
            >
              <Anchor
                icon={<GithubIcon />}
                label="GitHub"
                href="#"
                primary={true}
                reverse={false}
                target="blank"
              />
              <Anchor
                icon={<LinkNextIcon />}
                label="Visit Site"
                href="#"
                primary={true}
                reverse={false}
                target="blank"
              />
            </Box>
          }
        />
      </Tile>
    ));

    return (
      <div className="Projects">
        <Tiles
          fill={true}
          flush={false}
        >
          {projects}
        </Tiles>
      </div>
    );
  }
}

Projects.defaultProps = {
  userProfile: {}
};

Projects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array })
};


function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

export default connect(mapStateToProps)(Projects);
