import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';

import { TEXT_STYLE, COLOR } from '../../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
  },
  headlineStyle: {
    ...TEXT_STYLE.headline,
    color: COLOR.highContrastDark,
    marginBottom: 12,
  },
  dividerStyle: {
    backgroundColor: COLOR.lowContrastLight,
  },
});

export const PokemonMoveSection = ({ headline, pokemonMoves }) => (
  <View style={styles.containerStyle}>
    <Text style={styles.headlineStyle}>{headline}</Text>
    <Divider style={styles.dividerStyle} />
    {pokemonMoves}
    <Divider style={styles.dividerStyle} />
  </View>
);

PokemonMoveSection.propTypes = {
  headline: PropTypes.string.isRequired,
  pokemonMoves: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};
