import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import pokemonImages from '../../util/pokemonImages';


export const PokemonAvatar = ({ size, imageKey }) => (
  <Image
    source={pokemonImages[imageKey]}
    style={{ height: size, width: size }}
  />
);

PokemonAvatar.propTypes = {
  size: PropTypes.number.isRequired,
  imageKey: PropTypes.string.isRequired,
};
