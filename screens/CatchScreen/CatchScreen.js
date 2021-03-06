import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';
import { SearchBarHeader, PlusButton } from '../components';
import * as catchPokemonModule from '../../modules/catchPokemon';
import { CatchPokemonItem } from './components';

const CatchScreen = (props) => {
  const { navigation, catchPokemons } = props;

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.highContrastLight }}>
      <SearchBarHeader text="Pokemon to catch" />
      <FlatList
        data={catchPokemons}
        renderItem={({ item }) => <CatchPokemonItem pokemon={item} />}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 60,
          paddingTop: 149,
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
  catchPokemons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    selectedFastMove: PropTypes.shape({
      name: PropTypes.string,
      typeImageKey: PropTypes.string,
    }),
    selectedChargeMove: PropTypes.shape({
      name: PropTypes.string,
      typeImageKey: PropTypes.string,
    }),
  })),
  navigation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  catchPokemons: catchPokemonModule.selectCatchPokemons(state),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CatchScreen);
