import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchPokemonModule from '../modules/searchPokemon';
import { SearchBarHeader, BackButton } from './components';
import { COLOR, TEXT_STYLE, elevation } from './commonStyles';


const FindPokemonScreen = ({
  pokemons, searchText, updateSearchText, navigation,
}) => {
  const renderPokemon = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ width: 104, height: 104, backgroundColor: 'orange' }} />
        <Text style={{ ...TEXT_STYLE.subtitle1, color: COLOR.highContrastDark, textAlign: 'center', backgroundColor: 'pink', width: 104, marginTop: 2 }} numberOfLines={1}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.lowContrastLight }}>
      <SearchBarHeader text="Find Pokemon" searchText={searchText} onSearchChange={updateSearchText} />
      <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={{
          backgroundColor: COLOR.highContrastLight,
          marginHorizontal: 12,
          ...elevation(1),
          paddingBottom: 60,
          paddingTop: 124,
        }}
      />
      <BackButton onPress={() => navigation.goBack()} />
    </View>
  );
};

FindPokemonScreen.defaultProps = {
  pokemons: [],
};

FindPokemonScreen.propTypes = {
  searchText: PropTypes.string.isRequired,
  pokemons: PropTypes.arrayOf(PropTypes.object),
  updateSearchText: PropTypes.func.isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { searchPokemon: { searchText } } = state;
  return {
    searchText,
    pokemons: searchPokemonModule.selectPokemons(state),
  };
};

const mapDispatchToProps = {
  updateSearchText: searchPokemonModule.updateSearchText,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPokemonScreen);
