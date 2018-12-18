import React from 'react';
import {
  View, StyleSheet, TouchableHighlight, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';

import { Card, PokemonAvatar, PokemonTypeImage } from '../../components';
import { TEXT_STYLE, COLOR } from '../../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  movesContainerStyle: { flex: 1, marginLeft: 6 },
  moveRowContainerStyle: { flexDirection: 'row', alignItems: 'center' },
  moveTextStyle: { marginLeft: 12, ...TEXT_STYLE.subtitle1 },
  dividerStyle: { marginVertical: 8, backgroundColor: COLOR.highContrastLight },
});

export const CatchPokemonItem = ({ pokemon, ...props }) => (
  <Card>
    <TouchableHighlight
      underlayColor={COLOR.highContrastDark}
      {...props}
    >
      <View style={styles.containerStyle}>
        <PokemonAvatar imageKey={pokemon.imageKey} size={66} />
        <View style={styles.movesContainerStyle}>
          <View style={styles.moveRowContainerStyle}>
            <PokemonTypeImage imageKey={pokemon.selectedFastMove.typeImageKey} />
            <Text style={styles.moveTextStyle}>{pokemon.selectedFastMove.name}</Text>
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={styles.moveRowContainerStyle}>
            <PokemonTypeImage imageKey={pokemon.selectedChargeMove.typeImageKey} />
            <Text style={styles.moveTextStyle}>{pokemon.selectedChargeMove.name}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  </Card>
);

CatchPokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    imageKey: PropTypes.string,
    selectedFastMove: PropTypes.object,
    selectedChargeMove: PropTypes.object,
  }).isRequired,
};
