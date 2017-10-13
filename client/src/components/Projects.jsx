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
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';

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
        {
          project.images.length <= 1 ? (
            <Image size="medium" src={project.images[0]} />
          ) : (
            <Box size="medium" full={false}>
              <Carousel>
                {
                  project.images.map((image) => <Image full={false} fit="cover" src={image} />)
                }
              </Carousel>
            </Box>
          )
        }
        <Card
          heading={project.title}
          description={project.description}
          link={
            <Box
              direction="row"
              justify="between"
              responsive={false}
            >
              <Anchor
                icon={<GithubIcon />}
                label="GitHub"
                href={project.github_link}
                primary={true}
                reverse={false}
                target="blank"
              />
              <Anchor
                icon={<LinkNextIcon />}
                label="Visit Site"
                href={project.website_link}
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
  userProfile: {},
};

Projects.propTypes = {
  userProfile: PropTypes.shape({ projects: PropTypes.array }),
};


function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

export default connect(mapStateToProps)(Projects);
