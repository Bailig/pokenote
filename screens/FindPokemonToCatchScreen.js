import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FindPokemon from './containers/FindPokemon';
import * as catchPokemonModule from '../modules/catchPokemon';

const FindPokemonToCatchScreen = ({ navigation, updateSelectedPokemonToAdd }) => {
  const handlePokemonPress = (pokemonId) => {
    updateSelectedPokemonToAdd(pokemonId);
    navigation.navigate('addCatchPokemon');
  };
  return (
    <FindPokemon
      onPokemonPress={handlePokemonPress}
      onBack={() => navigation.goBack()}
    />
  );
};

FindPokemonToCatchScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  updateSelectedPokemonToAdd: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateSelectedPokemonToAdd: catchPokemonModule.updateSelectedPokemonToAdd,
};

export default connect(null, mapDispatchToProps)(FindPokemonToCatchScreen);
