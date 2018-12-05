import R from 'ramda';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLOR, TEXT_STYLE } from './commonStyles';
import { Header, DarkBackButton } from './components';
import * as catchPokemonModule from '../modules/catchPokemon';
import pokemonImages from '../util/pokemonImages';
import pokemonTypeImages from '../util/pokemonTypeImages';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLOR.highContrastLight,
    paddingHorizontal: 20,
    paddingTop: 76,
  },
  pokemonStyle: {
    flex: 1,
    height: 130,
    alignItems: 'center',
  },
  pokemonImageStyle: {
    height: 104,
    width: 140,
  },
  pokemonNameStyle: {
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    textAlign: 'center',
  },
});

const AddCatchPokemonScreen = ({ navigation, pokemon }) => {
  // TODO: start from show the seleted moves
  const renderSelectedMoves = (move) => {
    return (
      <View>
        <Image source={pokemonTypeImages[move.pokemonTypeImageKey]} />
        <Text>{move.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.containerStyle}>
      <Header text="Select Ideal Moves" />
      <View style={styles.pokemonStyle}>
        <Image source={pokemonImages[pokemon.imageKey]} style={styles.pokemonImageStyle} />
        <Text style={styles.pokemonNameStyle}>{pokemon.name}</Text>
      </View>
      <View>
        <Text>Selected Moves</Text>
        <Divider style={{ backgroundColor: COLOR.lowContrastLight }} />
        {R.map(renderSelectedMoves, pokemon.selectedPokemonMoves)}
      </View>
      <DarkBackButton onPress={navigation.goBack} />
    </View>
  );
};

AddCatchPokemonScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  pokemon: PropTypes.shape({
    imageKey: PropTypes.string,
    name: PropTypes.string,
    quickMoves: PropTypes.array,
    cinematicMoves: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  pokemon: catchPokemonModule.selectPokemonToAdd(state),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCatchPokemonScreen);
