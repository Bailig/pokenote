import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchPokemonModule from '../../modules/searchPokemon';
import { SearchBarHeader, DarkBackButton, PokemonAvatar } from '../components';
import { COLOR, TEXT_STYLE, elevation } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLOR.lowContrastLight,
  },
  listContainerStyle: {
    ...elevation(1),
    backgroundColor: COLOR.highContrastLight,
    marginHorizontal: 12,
    paddingBottom: 60,
    paddingTop: 124,
  },
  pokemonItemContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
  },
  pokemonItemTextStyle: {
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    textAlign: 'center',
    width: 104,
    marginTop: 2,
  },
});

const FindPokemon = ({
  pokemons, searchText, updateSearchText, clearSearchText, onPokemonPress, onBack,
}) => {
  const handlePokemonPress = (pokemonId) => {
    onPokemonPress(pokemonId);
    clearSearchText();
  };
  const renderPokemon = ({ item }) => (
    <TouchableHighlight
      style={styles.pokemonItemContainerStyle}
      onPress={() => handlePokemonPress(item.id)}
      underlayColor={COLOR.lowContrastDark}
    >
      <View>
        <PokemonAvatar imageKey={item.imageKey} size={104} />
        <Text style={styles.pokemonItemTextStyle} numberOfLines={1}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  renderPokemon.propTypes = {
    item: PropTypes.shape({
      imageKey: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  };

  return (
    <View style={styles.containerStyle}>
      <SearchBarHeader text="Find Pokemon" searchText={searchText} onSearchChange={updateSearchText} />
      <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContainerStyle}
      />
      <DarkBackButton onPress={onBack} />
    </View>
  );
};

FindPokemon.defaultProps = {
  pokemons: [],
};

FindPokemon.propTypes = {
  searchText: PropTypes.string.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.object),
  updateSearchText: PropTypes.func.isRequired,
  clearSearchText: PropTypes.func.isRequired,
  onPokemonPress: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchText: state.searchPokemon.searchText,
  pokemons: searchPokemonModule.selectPokemons(state),
});


const mapDispatchToProps = {
  updateSearchText: searchPokemonModule.updateSearchText,
  clearSearchText: searchPokemonModule.clearSearchText,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPokemon);
