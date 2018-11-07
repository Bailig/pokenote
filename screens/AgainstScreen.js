import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, AddPokemonButton } from './components';
import { selectAgainstPokemons } from '../modules/againstPokemon';

const AgainstScreen = (props) => {
  const { againstPokemons, navigation } = props;
  const handleRenderRow = ({ item, index }) => {
    if (!item) return <AddPokemonButton onPress={() => navigation.navigate('findPokemon')} />;
    return <View />;
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
}

AgainstScreen.defaultProps = {
  againstPokemons: new Array(6).fill(null),
};

AgainstScreen.propTypes = {
  againstPokemons: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({ againstPokemons: selectAgainstPokemons(state) });

export default connect(mapStateToProps)(AgainstScreen);
