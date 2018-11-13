import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, AddPokemonButton } from './components';
import * as againstPokemonModule from '../modules/againstPokemon';

const AgainstScreen = (props) => {
  const { againstPokemons, navigation, updateAgainstPokemonIndex } = props;

  const handleRenderRow = ({ item, index }) => {
    const handleOnPress = () => {
      updateAgainstPokemonIndex(index);
      navigation.navigate('findPokemon');
    };

    if (!item) return <AddPokemonButton onPress={handleOnPress} />;
    return <View />;
  };
  handleRenderRow.propTypes = {
    item: PropTypes.shape().isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <View style={{ flex: 1 }}>
      <Header text="Pokemons to fight against" />
      <FlatList
        style={{ flex: 1, marginHorizontal: 20, marginTop: 100 }}
        data={againstPokemons}
        renderItem={handleRenderRow}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

AgainstScreen.defaultProps = {
  againstPokemons: new Array(6).fill(null),
};

AgainstScreen.propTypes = {
  againstPokemons: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateAgainstPokemonIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  againstPokemons: againstPokemonModule.selectAgainstPokemons(state),
});

const mapDispatchToProps = {
  updateAgainstPokemonIndex: againstPokemonModule.updateAgainstPokemonIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgainstScreen);
