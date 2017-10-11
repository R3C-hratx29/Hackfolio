import React from 'react';
import PropTypes from 'prop-types';

import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import GithubIcon from 'grommet/components/icons/base/SocialGithub';

import './Projects.scss';

class Projects extends React.Component {
  static propTypes = {

  }

  render() {

    return (
      <div className="Projects">
        <Tiles fill={true}
          flush={false}>
          <Tile>
            <Card thumbnail='//cdn.dribbble.com/users/33073/screenshots/2425824/800.png'
              heading='Read Books'
              description='Sample description providing more details.'
              link={
                <Box direction='row' justify='between'>
                  <Anchor
                    icon={<GithubIcon />}
                    label='GitHub'
                    href='#'
                    primary={true}
                    reverse={false}
                    target='blank'
                  />
                  <Anchor
                    icon={<LinkNextIcon />}
                    label='Visit Site'
                    href='#'
                    primary={true}
                    reverse={false}
                    target='blank'
                  />
                </Box>
              }
            />
          </Tile>
        </Tiles>
      </div>
    )
  }
}

export default Projects;
