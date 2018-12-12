import R from 'ramda';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';
import { Header, DarkBackButton } from '../components';
import * as catchPokemonModule from '../../modules/catchPokemon';
import { PokemonMoveSection, PokemonMove, Pokemon, CheckBox } from './components';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLOR.highContrastLight,
  },
  scrollViewStyle: {
    paddingTop: 76,
    paddingBottom: 70,
    paddingHorizontal: 20,
  },
});

const AddCatchPokemonScreen = ({
  navigation,
  pokemon,
  updateSelectedPokemonMove,
}) => {
  const renderSelectedMoves = (pokemonMove, index) => (
    <PokemonMove pokemonMove={pokemonMove} key={index} />
  );

  const renderMoveSelections = pokemonMove => (
    <PokemonMove
      key={pokemonMove.id}
      pokemonMove={pokemonMove}
      onPokemonMoveSelect={updateSelectedPokemonMove}
      checkbox={(
        <CheckBox
          checked={pokemonMove.selected}
          onIconPress={() => updateSelectedPokemonMove(pokemonMove.id)}
        />
      )}
    />
  );

  return (
    <View style={styles.containerStyle}>
      <Header text="Select Ideal Moves" />

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Pokemon imageKey={pokemon.imageKey} name={pokemon.name} />

        <PokemonMoveSection
          headline="Selected Moves"
          pokemonMoves={R.addIndex(R.map)(renderSelectedMoves, pokemon.selectedPokemonMoves)}
        />

        <PokemonMoveSection
          headline="Fast Moves"
          pokemonMoves={R.map(renderMoveSelections, pokemon.quickMoves)}
        />

        <PokemonMoveSection
          headline="Charged Moves"
          pokemonMoves={R.map(renderMoveSelections, pokemon.cinematicMoves)}
        />
      </ScrollView>

      <DarkBackButton onPress={() => navigation.goBack()} />
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
  updateSelectedPokemonMove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pokemon: catchPokemonModule.selectSelectedPokemon(state),
});

const mapDispatchToProps = {
  updateSelectedPokemonMove: catchPokemonModule.updateSelectedPokemonMove,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCatchPokemonScreen);
