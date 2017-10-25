import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tiles from 'grommet/components/Tiles';
import SearchCard from './SearchCard';

const SearchPage = (props) => (
  <Tiles flush={false} justify="around">
    { props.searchResults.map((profile) => {
        return <SearchCard key={profile.username} userProfile={profile} />;
      })
    }
  </Tiles>
);

SearchPage.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    bio: PropTypes.string,
    profile_pic: PropTypes.string,
    proffession: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string
  })).isRequired
};

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults.results
  };
}

export default connect(mapStateToProps)(SearchPage);
