import React from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';

import { PokemonTypeItem } from '.';
import { COLOR, TEXT_STYLE } from '../../commonStyles';
import { Card, PokemonAvatar } from '../../components';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
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
  <Card>
    <TouchableHighlight
      underlayColor={COLOR.lowContrastDark}
      {...props}
    >
      <View style={styles.containerStyle}>
        <PokemonAvatar imageKey={pokemon.imageKey} size={66} />

        <View style={styles.defendeEffectiveContainerStyle}>
          <View style={styles.defendeEffectiveRowStyle}>
            <Text style={styles.textVulnerableToStyle}>Vulnerable to</Text>
            <View style={styles.pokemonTypesContainerStyle}>
              {
              pokemon.defenceTypeEffective.vulnerableToTypes
                .map(t => <PokemonTypeItem {...t} key={t.id} textStyle={{ color: COLOR.red }} />)
              }
            </View>
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={styles.defendeEffectiveRowStyle}>
            <Text style={styles.textResistantToStyle}>Resistant to</Text>
            <View style={styles.pokemonTypesContainerStyle}>
              {
              pokemon.defenceTypeEffective.resistantToTypes
                .map(t => <PokemonTypeItem {...t} key={t.id} textStyle={{ color: COLOR.green }} />)
            }
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  </Card>
);

AgainstPokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    imageKey: PropTypes.string,
    defenceTypeEffective: PropTypes.object,
  }).isRequired,
};
