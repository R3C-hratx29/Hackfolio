import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import {
  Tile,
  Card,
  Anchor,
  Box,
  Carousel,
  Image,
  Heading
} from 'grommet';

// Grommet Icons
import {
  LinkNextIcon,
  SocialGithubIcon,
  EditIcon
} from 'grommet/components/icons/base';

import placeHolderImage from './../../images/placeholder.png';

import './../../styles/ProjectCard.scss';

function httpify(value) {
  let string = value.trim();
  if (!/^((http|https):\/\/)/.test(value.trim())) {
    string = `http://${string}`;
  }
  return string.trim();
}

const ProjectCard = props => {
  const images = props.project.images.split(',');
  const stack = props.project.stack.split(',');

  return (
    <Tile className="ProjectCard">
      {images.length === 1 &&
        images[0] !== '' && (
          <Image
            size="medium"
            style={{ width: 384, height: 280 }}
            src={httpify(images[0])}
          />
        )}
      {images.length > 1 && (
        <Box size="medium">
          <Carousel autoplay={false} style={{ width: 390, height: 284 }}>
            {images.map((image, index) => {
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
            <span className="title">{props.project.title}</span>
            <EditIcon
              className="editProjectIcon"
              onClick={() => props.editProject(props.project)}
            />
          </Heading>
        }
        description={
          <div>
            <Heading tag="h3" className="description">
              {props.project.description}
            </Heading>
            <div className="stack">
              {stack.map((el, index) => {
                const i = index;
                return el && el.trim() !== '' && <div key={i}>{el}</div>;
              })}
            </div>
          </div>
        }
        link={
          <Box direction="row" justify="between" responsive={false}>
            {props.project.github_link && (
              <Anchor
                icon={<SocialGithubIcon />}
                label="GitHub"
                href={httpify(props.project.github_link)}
                primary
                reverse={false}
                target="blank"
                className="githubLink"
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
                className="websiteLink"
              />
            )}
          </Box>
        }
      />
    </Tile>
  );
};

ProjectCard.defaultProps = {
  editProject: () => {},
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    images: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    stack: PropTypes.string,
    github_link: PropTypes.string,
    website_link: PropTypes.string,
  }).isRequired,
  editProject: PropTypes.func,
};

export default ProjectCard;
