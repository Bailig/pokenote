import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchPokemonModule from '../modules/searchPokemon';
import { SearchBarHeader, BackButton } from './components';
import { COLOR } from './commonStyles';

const FindPokemonScreen = ({ searchText, updateSearchText, navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.lowContrastLight }}>
      <SearchBarHeader text="Find Pokemon" searchText={searchText} onSearchChange={updateSearchText} />
      <BackButton onPress={() => navigation.goBack()} />
    </View>
  );
};

FindPokemonScreen.propTypes = {
  searchText: PropTypes.string.isRequired,
  updateSearchText: PropTypes.func.isRequired,
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => {
  const { searchPokemon: { searchText } } = state;
  return { searchText };
};

const mapDispatchToProps = {
  updateSearchText: searchPokemonModule.updateSearchText,
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPokemonScreen);
