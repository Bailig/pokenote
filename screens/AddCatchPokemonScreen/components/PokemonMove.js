import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import pokemonTypeImages from '../../../util/pokemonTypeImages';
import { TEXT_STYLE, COLOR } from '../../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
  imageStyle: {
    height: 32,
    width: 32,
  },
  nameStyle: {
    flex: 1,
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    marginLeft: 16,
  },
});

export const PokemonMove = ({ pokemonMove, checkbox }) => {
  if (!pokemonMove) return <View style={styles.containerStyle} />;
  const { typeImageKey, name } = pokemonMove;
  return (
    <View style={styles.containerStyle}>
      <Image source={pokemonTypeImages[typeImageKey]} style={styles.imageStyle} />
      <Text style={styles.nameStyle}>{name}</Text>
      {checkbox}
    </View>
  );
};

PokemonMove.defaultProps = {
  pokemonMove: undefined,
  checkbox: undefined,
};

PokemonMove.propTypes = {
  pokemonMove: PropTypes.shape({
    typeImageKey: PropTypes.string,
    name: PropTypes.string,
  }),
  checkbox: PropTypes.element,
};
