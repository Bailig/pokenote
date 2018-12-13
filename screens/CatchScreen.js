import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR } from './commonStyles';
import { SearchBarHeader, PlusButton } from './components';
import * as catchPokemonModule from '../modules/catchPokemon';

const CatchScreen = (props) => {
  const { navigation, catchPokemons } = props;

  const handleRenderRow = () => <View />;

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.highContrastLight }}>
      <SearchBarHeader text="Pokemon to catch" />
      <FlatList
        data={catchPokemons}
        renderItem={handleRenderRow}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 60,
          paddingTop: 100,
        }}
      />
      <PlusButton onPress={() => navigation.navigate('catchMenu')} />
    </View>
  );
};

CatchScreen.defaultProps = {
  catchPokemons: [],
};

CatchScreen.propTypes = {
  catchPokemons: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  catchPokemons: catchPokemonModule.selectCatchPokemons(state),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CatchScreen);
