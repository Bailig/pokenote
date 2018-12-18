import R from 'ramda';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';
import { Header, DarkBackButton, FloatingActionButton } from '../components';
import * as catchPokemonModule from '../../modules/catchPokemon';
import {
  PokemonMoveSection, PokemonMove, Pokemon, CheckBox,
} from './components';

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
  saveButton: {
    backgroundColor: COLOR.lowContrastDark,
    position: 'absolute',
    right: 20,
    bottom: 18,
  },
});

const AddCatchPokemonScreen = ({
  navigation,
  pokemon,
  updateAddPokemonMove,
  saveAddPokemon,
}) => {
  const renderSelectedMoves = () => [
    <PokemonMove pokemonMove={pokemon.selectedFastMove} key="selectedFastMove" />,
    <PokemonMove pokemonMove={pokemon.selectedChargeMove} key="selectedChargeMove" />,
  ];

  const renderMoveSelections = R.curry((moveProp, pokemonMove) => (
    <PokemonMove
      key={pokemonMove.id}
      pokemonMove={pokemonMove}
      checkbox={(
        <CheckBox
          checked={pokemonMove.selected}
          onIconPress={() => updateAddPokemonMove({ moveProp, value: pokemonMove.id })}
        />
      )}
    />
  ));

  const handleSave = () => {
    saveAddPokemon();
    navigation.pop(2);
  };

  return (
    <View style={styles.containerStyle}>
      <Header text="Select Ideal Moves" />

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Pokemon imageKey={pokemon.imageKey} name={pokemon.name} />

        <PokemonMoveSection
          headline="Selected Moves"
          pokemonMoves={renderSelectedMoves()}
        />

        <PokemonMoveSection
          headline="Fast Moves"
          pokemonMoves={R.map(renderMoveSelections('fastMoveId'), pokemon.fastMoves)}
        />

        <PokemonMoveSection
          headline="Charge Moves"
          pokemonMoves={R.map(renderMoveSelections('chargeMoveId'), pokemon.chargeMoves)}
        />
      </ScrollView>

      <DarkBackButton onPress={() => navigation.goBack()} />

      <FloatingActionButton
        style={styles.saveButton}
        size={56}
        onPress={handleSave}
      >
        <Icon name="check" type="font-awesome" color={COLOR.highContrastLight} size={32} />
      </FloatingActionButton>
    </View>
  );
};

const typeMove = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  typeImageKey: PropTypes.string,
});

AddCatchPokemonScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  pokemon: PropTypes.shape({
    imageKey: PropTypes.string,
    name: PropTypes.string,
    fastMoves: PropTypes.arrayOf(typeMove),
    chargeMoves: PropTypes.arrayOf(typeMove),
    selectedFastMove: typeMove,
    selectedChargeMove: typeMove,
  }).isRequired,
  updateAddPokemonMove: PropTypes.func.isRequired,
  saveAddPokemon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pokemon: catchPokemonModule.selectAddPokemon(state),
});

const mapDispatchToProps = {
  updateAddPokemonMove: catchPokemonModule.updateAddPokemonMove,
  saveAddPokemon: catchPokemonModule.saveAddPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCatchPokemonScreen);
