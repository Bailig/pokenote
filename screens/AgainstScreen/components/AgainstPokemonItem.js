import React from 'react';
import {
  View, Image, Text, StyleSheet, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';

import pokemonImages from '../../../util/pokemonImages';
import { PokemonTypeItem } from '.';
import { COLOR, TEXT_STYLE } from '../../commonStyles';

const styles = StyleSheet.create({
  touchableContainerStyle: {
    backgroundColor: COLOR.lowContrastLight,
    borderRadius: 28,
    marginBottom: 24,
  },
  containerStyle: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  pokemonImageStyle: {
    height: 66,
    width: 66,
  },
  defendeEffectiveContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 6,
  },
  defendeEffectiveRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonTypesContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textVulnerableToStyle: {
    ...TEXT_STYLE.subtitle2,
    width: 70,
    textAlign: 'center',
    color: COLOR.red,
  },
  textResistantToStyle: {
    ...TEXT_STYLE.subtitle2,
    width: 70,
    textAlign: 'center',
    color: COLOR.green,
  },
  dividerStyle: {
    backgroundColor: COLOR.highContrastLight,
    marginVertical: 3,
  },
});

export const AgainstPokemonItem = ({ pokemon, ...props }) => (
  <TouchableHighlight
    style={styles.touchableContainerStyle}
    underlayColor={COLOR.lowContrastDark}
    {...props}
  >
    <View style={styles.containerStyle}>
      <Image source={pokemonImages[pokemon.imageKey]} style={styles.pokemonImageStyle} />

      <View style={styles.defendeEffectiveContainerStyle}>
        <View style={styles.defendeEffectiveRowStyle}>
          <Text style={styles.textVulnerableToStyle}>Vulnerable to</Text>
          <View style={styles.pokemonTypesContainerStyle}>
            {
              pokemon.defenceTypeEffective.resistantToTypes
                .map(t => <PokemonTypeItem {...t} key={t.id} textStyle={{ color: COLOR.red }} />)
            }
          </View>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={styles.defendeEffectiveRowStyle}>
          <Text style={styles.textResistantToStyle}>Resistant to</Text>
          <View style={styles.pokemonTypesContainerStyle}>
            {
              pokemon.defenceTypeEffective.vulnerableToTypes
                .map(t => <PokemonTypeItem {...t} key={t.id} textStyle={{ color: COLOR.green }} />)
            }
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

AgainstPokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    imageKey: PropTypes.string,
    defenceTypeEffective: PropTypes.object,
  }).isRequired,
};
