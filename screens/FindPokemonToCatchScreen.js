import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FindPokemon from './containers/FindPokemon';
import * as catchPokemonModule from '../modules/catchPokemon';

const FindPokemonToCatchScreen = ({ navigation, updateAddPokemon }) => {
  const handlePokemonPress = (pokemonId) => {
    updateAddPokemon(pokemonId);
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
  updateAddPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateAddPokemon: catchPokemonModule.updateAddPokemon,
};

export default connect(null, mapDispatchToProps)(FindPokemonToCatchScreen);
