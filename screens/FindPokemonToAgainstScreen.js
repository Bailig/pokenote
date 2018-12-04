import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FindPokemon from './containers/FindPokemon';
import * as againstPokemonModule from '../modules/againstPokemon';

const FindPokemonToAgainstScreen = ({ navigation, updateAgainstPokemon }) => {
  const handlePokemonPress = (pokemonId) => {
    updateAgainstPokemon(pokemonId);
    navigation.goBack();
  };
  return (
    <FindPokemon
      onPokemonPress={handlePokemonPress}
      onBack={() => navigation.goBack()}
    />
  );
};

FindPokemonToAgainstScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  updateAgainstPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateAgainstPokemon: againstPokemonModule.updateAgainstPokemon,
};

export default connect(null, mapDispatchToProps)(FindPokemonToAgainstScreen);
