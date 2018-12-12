import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, AddPokemonButton, PlusButton } from '../components';
import { AgainstPokemonItem } from './components';
import * as againstPokemonModule from '../../modules/againstPokemon';
import { COLOR } from '../commonStyles';

const AgainstScreen = (props) => {
  const {
    againstPokemons,
    navigation,
    updateAgainstPokemonIndex,
  } = props;

  const handleRenderRow = ({ item, index }) => {
    const handlePress = () => {
      updateAgainstPokemonIndex(index);
      navigation.navigate('findPokemonToAgainst');
    };
    if (!item) return <AddPokemonButton onPress={handlePress} />;
    return <AgainstPokemonItem pokemon={item} onPress={handlePress} />;
  };
  handleRenderRow.propTypes = {
    item: PropTypes.shape().isRequired,
    index: PropTypes.number.isRequired,
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.highContrastLight }}>
      <Header text="Pokemon to fight against" />
      <FlatList
        data={againstPokemons}
        renderItem={handleRenderRow}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 60,
          paddingTop: 100,
        }}
      />
      <PlusButton onPress={() => navigation.navigate('againstMenu')} />
    </View>
  );
};

AgainstScreen.defaultProps = {
  againstPokemons: new Array(6).fill(undefined),
};

AgainstScreen.propTypes = {
  againstPokemons: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape().isRequired,
  updateAgainstPokemonIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  againstPokemons: againstPokemonModule.selectAgainstPokemons(state),
});

const mapDispatchToProps = {
  updateAgainstPokemonIndex: againstPokemonModule.updateAgainstPokemonIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgainstScreen);
