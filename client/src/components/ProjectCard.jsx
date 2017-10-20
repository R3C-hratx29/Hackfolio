import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';

// Grommet Icons
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import GithubIcon from 'grommet/components/icons/base/SocialGithub';
import EditIcon from 'grommet/components/icons/base/Edit';

import placeHolderImage from '../images/placeholder.png';

import '../styles/ProjectCard.scss';

function httpify(value) {
  let string = value;
  if (!/^((http|https):\/\/)/.test(value)) {
    string = `http://${string}`;
  }
  return string;
}

const ProjectCard = props => (
  <Tile className="ProjectCard" style={{ overflow: 'scroll' }}>
    {props.project.images.length === 1 &&
      props.project.images[0] !== '' && (
        <Image
          size="medium"
          style={{ maxWidth: 384, maxHeight: 280 }}
          src={httpify(props.project.images[0])}
        />
      )}
    {props.project.images.length > 1 && (
      <Box size="medium">
        <Carousel autoplay={false} style={{ maxWidth: 390, maxHeight: 284 }}>
          {props.project.images.map((image, index) => {
            const i = index;
            let imageURL = image;
            if (!image) {
              imageURL = placeHolderImage;
            } else {
              imageURL = httpify(imageURL);
            }
            return <Image key={i} size="medium" fit="cover" src={imageURL} />;
          })}
        </Carousel>
      </Box>
    )}
    <Card
      contentPad="medium"
      heading={
        <Heading strong tag="h2">
          {props.project.title}
          <EditIcon className="editProjectIcon" onClick={() => props.editProject(props.project)} />
        </Heading>
      }
      description={
        <div>
          <Heading tag="h3" className="description">
            {props.project.description}
          </Heading>
          <div className="stack">
            {props.project.stack.map((el, index) => {
              const i = index;
              return el && <div key={i}>{el}</div>;
            })}
          </div>
        </div>
      }
      link={
        <Box direction="row" justify="between" responsive={false}>
          {props.project.github_link && (
            <Anchor
              icon={<GithubIcon />}
              label="GitHub"
              href={httpify(props.project.github_link)}
              primary
              reverse={false}
              target="blank"
            />
          )}
          {props.project.website_link && (
            <Anchor
              icon={<LinkNextIcon />}
              label="Visit Site"
              href={httpify(props.project.website_link)}
              primary
              reverse={false}
              target="blank"
            />
          )}
        </Box>
      }
    />
  </Tile>
);

ProjectCard.defaultProps = {
  editProject: () => {},
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    images: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string,
    stack: PropTypes.array,
    github_link: PropTypes.string,
    website_link: PropTypes.string,
  }).isRequired,
  editProject: PropTypes.func,
};

export default ProjectCard;
