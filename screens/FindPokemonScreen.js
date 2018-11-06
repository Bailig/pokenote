import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header } from './components';

const FindPokemonScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header text="Find Pokemon" />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { pokemons: state.pokemon.pokemmons };
};

export default connect(mapStateToProps)(FindPokemonScreen);
