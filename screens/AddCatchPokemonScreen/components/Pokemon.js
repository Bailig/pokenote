import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { TEXT_STYLE, COLOR } from '../../commonStyles';
import { PokemonAvatar } from '../../components';

const styles = StyleSheet.create({
  containerStyle: {
    height: 130,
    alignItems: 'center',
  },
  nameStyle: {
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    textAlign: 'center',
  },
});

export const Pokemon = ({ imageKey, name }) => (
  <View style={styles.containerStyle}>
    <PokemonAvatar imageKey={imageKey} size={104} />
    <Text style={styles.nameStyle}>{name}</Text>
  </View>
);

Pokemon.propTypes = {
  imageKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
