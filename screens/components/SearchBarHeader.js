import React from 'react';
import PropTypes from 'prop-types';

import { HeaderContainer, Headline, SearchBar } from '.';


export const SearchBarHeader = ({ text, searchText, onSearchChange }) => (
  <HeaderContainer
    style={{ height: 112 }}
  >
    <Headline>{text}</Headline>
    <SearchBar value={searchText} onChangeText={onSearchChange} />
  </HeaderContainer>
);

SearchBarHeader.propTypes = {
  text: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
