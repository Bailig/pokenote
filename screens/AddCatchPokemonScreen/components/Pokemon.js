import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { TEXT_STYLE, COLOR } from '../../commonStyles';
import pokemonImages from '../../../util/pokemonImages';

const styles = StyleSheet.create({
  containerStyle: {
    height: 130,
    alignItems: 'center',
  },
  imageStyle: {
    height: 104,
    width: 140,
  },
  nameStyle: {
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    textAlign: 'center',
  },
});

export const Pokemon = ({ imageKey, name }) => (
  <View style={styles.containerStyle}>
    <Image source={pokemonImages[imageKey]} style={styles.imageStyle} />
    <Text style={styles.nameStyle}>{name}</Text>
  </View>
);

Pokemon.propTypes = {
  imageKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
