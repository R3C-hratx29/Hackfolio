import React from 'react';
import PropTypes from 'prop-types';
import {
  Tile,
  Image,
  Card,
  Heading,
  Anchor
} from 'grommet';
import MoreIcon from 'grommet/components/icons/base/More';

const SearchCard = (props) => (
  <Tile
    full={false}
    align="center"
  >
    <Image
      size="medium"
      style={{ maxWidth: 384, maxHeight: 280, objectFit: 'cover' }}
      src={props.userProfile.profile_pic}
    />
    <Card
      heading={props.userProfile.name}
      contentPad="medium"
      description={(
        <div>
          <Heading tag="h3">
            {props.userProfile.profession}
          </Heading>
          {props.userProfile.bio}
        </div>
      )}
    >
      <Anchor
        icon={<MoreIcon />}
        path={`/user/${props.userProfile.username}`}
      />
    </Card>
  </Tile>
);

SearchCard.propTypes = {
  userProfile: PropTypes.shape({
    profile_pic: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    bio: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
};
export default SearchCard;
