import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';
import pokemonTypeImages from '../../util/pokemonTypeImages';

export const PokemonTypeImage = ({ imageKey }) => (
  <View
    style={{
      height: 32,
      width: 32,
      borderRadius: 16,
      backgroundColor: COLOR.highContrastLight,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Image source={pokemonTypeImages[imageKey]} style={{ height: 24, width: 24 }} />
  </View>
);

PokemonTypeImage.propTypes = {
  imageKey: PropTypes.string.isRequired,
};
