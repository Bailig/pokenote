import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FindPokemon from './containers/FindPokemon';
import * as catchPokemonModule from '../modules/catchPokemon';

const FindPokemonToCatchScreen = ({ navigation, updatePokemonToAdd }) => {
  const handlePokemonPress = (pokemonId) => {
    updatePokemonToAdd(pokemonId);
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
  updatePokemonToAdd: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updatePokemonToAdd: catchPokemonModule.updatePokemonToAdd,
};

export default connect(null, mapDispatchToProps)(FindPokemonToCatchScreen);
