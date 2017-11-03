import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// Grommet Components
import {
  Tile,
  Card,
  Anchor,
  Box,
  Carousel,
  Image,
  Heading,
  Value
} from 'grommet';

// Grommet icons
import {
  EditIcon,
  SendIcon,
  MoneyIcon,
  StarIcon
} from 'grommet/components/icons/base';

import { setBounty, changeFavorite } from '../../actions/BountyActions';
import placeHolderImage from './../../images/placeholder.png';

import './../../styles/BountyCard.scss';

function httpify(value) {
  let string = value.trim();
  if (!/^((http|https):\/\/)/.test(value.trim())) {
    string = `http://${string}`;
  }
  return string.trim();
}

const BountyCard = props => {
  const images = props.bounty.images ? props.bounty.images.split(',') : '';
  const stack = props.bounty.stack.length ? props.bounty.stack.split(',') : [];
  const price = Number(props.bounty.price);
  const color = props.favorites.includes(props.bounty.bounty_id) ? 'warning' : 'unknown';
  const isFave = props.favorites.includes(props.bounty.bounty_id);
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
            {props.bounty.title}
            <EditIcon
              className="editBountyIcon"
              onClick={() => props.editBounty(props.bounty)}
            />
          </Heading>
        }
        description={
          <div>
            <Heading tag="h3" className="description">
              {props.bounty.description}
            </Heading>
            <div className="stack">
              {stack.map((el, index) => {
                const i = index;
                return el && el.trim() !== '' && <div key={parseInt(el, 10) * i}>{el}</div>;
              })}
            </div>
            <div>
              <Value
                value={price.toLocaleString(
                    'en-IN',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )
                }
                icon={<MoneyIcon />}
                units="USD"
              />
            </div>
            { props.isLoggedIn ?
              <div>
                { props.showSend ?
                  <Anchor
                    icon={<SendIcon />}
                    label="Discuss Terms"
                    onClick={() => props.setBounty(props.bounty)}
                    primary
                    reverse={false}
                  /> : <div />
                }
                <Anchor
                  icon={<StarIcon colorIndex={color} />}
                  onClick={() => props.changeFavorite(props.bounty.bounty_id, isFave)}
                />
              </div>
              : <div />
            }
          </div>
        }
      />
    </Tile>
  );
};

BountyCard.defaultProps = {
  editBounty: () => {},
};

BountyCard.propTypes = {
  bounty: PropTypes.shape({
    bounty_id: PropTypes.nuber,
    price: PropTypes.sting,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.string,
    stack: PropTypes.string
  }).isRequired,
  showSend: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  setBounty: PropTypes.func.isRequired,
  changeFavorite: PropTypes.func.isRequired,
  editBounty: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    isLoggedIn: state.currentUser.user_id > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBounty: (bounty) => { dispatch(setBounty(bounty)); dispatch(push(`/chat/${bounty.bounty_id}`)); },
    changeFavorite: (id, isFave) => dispatch(changeFavorite(id, isFave))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BountyCard);
