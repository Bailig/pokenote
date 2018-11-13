import _ from 'lodash';
import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, AddPokemonButton } from './components';
import * as againstPokemonModule from '../modules/againstPokemon';

class AgainstScreen extends React.Component {
  componentWillReceiveProps(newProps) {
    this.handleUpdatingAgainstPokemon(newProps);
  }

  handleUpdatingAgainstPokemon(newProps) {
    const { selectedPokemonId, currentAgainstPokemonIndex } = this.props;
    if (newProps.selectedPokemonId === selectedPokemonId
      && newProps.currentAgainstPokemonIndex === currentAgainstPokemonIndex) return;

    if (!newProps.selectedPokemonId || _.isNil(newProps.currentAgainstPokemonIndex)) return;

    const { updateAgainstPokemon } = this.props;
    updateAgainstPokemon({
      selectedPokemonId: newProps.selectedPokemonId,
      currentAgainstPokemonIndex: newProps.currentAgainstPokemonIndex,
    });
  }

  render() {
    const {
      againstPokemons,
      navigation,
      updateAgainstPokemonIndex,
    } = this.props;
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
  }
}

AgainstScreen.defaultProps = {
  againstPokemons: new Array(6).fill(null),
  selectedPokemonId: null,
  currentAgainstPokemonIndex: null,
};

AgainstScreen.propTypes = {
  againstPokemons: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  selectedPokemonId: PropTypes.string,
  currentAgainstPokemonIndex: PropTypes.number,
  updateAgainstPokemonIndex: PropTypes.func.isRequired,
  updateAgainstPokemon: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  againstPokemons: againstPokemonModule.selectAgainstPokemons(state),
  selectedPokemonId: state.searchPokemon.selectedPokemonId,
  currentAgainstPokemonIndex: state.againstPokemon.currentAgainstPokemonIndex,
});

const mapDispatchToProps = {
  updateAgainstPokemonIndex: againstPokemonModule.updateAgainstPokemonIndex,
  updateAgainstPokemon: againstPokemonModule.updateAgainstPokemon,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgainstScreen);
