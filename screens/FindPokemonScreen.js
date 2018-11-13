import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchPokemonModule from '../modules/searchPokemon';
import { SearchBarHeader, BackButton } from './components';
import { COLOR, TEXT_STYLE, elevation } from './commonStyles';
import images from '../util/images';

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
  pokemonItemImageStyle: {
    width: 104,
    height: 104,
  },
  pokemonItemTextStyle: {
    ...TEXT_STYLE.subtitle1,
    color: COLOR.highContrastDark,
    textAlign: 'center',
    width: 104,
    marginTop: 2,
  },
});

const FindPokemonScreen = ({
  pokemons, searchText, updateSearchText, navigation, updateSelectedPokemon,
}) => {
  const renderPokemon = ({ item }) => {
    const handlePokemonOnPress = () => {
      updateSelectedPokemon(item.id);
      navigation.goBack();
    };
    return (
      <TouchableHighlight
        style={styles.pokemonItemContainerStyle}
        onPress={handlePokemonOnPress}
        underlayColor={COLOR.lowContrastDark}
      >
        <View>
          <Image style={styles.pokemonItemImageStyle} source={images[item.imageKey]} />
          <Text style={styles.pokemonItemTextStyle} numberOfLines={1}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };
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
  updateSelectedPokemon: PropTypes.func.isRequired,
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
  updateSelectedPokemon: searchPokemonModule.updateSelectedPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPokemonScreen);
