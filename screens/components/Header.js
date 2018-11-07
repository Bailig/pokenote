import React from 'react';
import PropTypes from 'prop-types';

import { HeaderContainer, Headline } from '.';

export const Header = ({ text }) => (
  <HeaderContainer style={{ height: 66 }}>
    <Headline>{text}</Headline>
  </HeaderContainer>
);

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
