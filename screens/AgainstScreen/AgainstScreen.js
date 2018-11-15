import _ from 'lodash';
import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header, AddPokemonButton, PlusButton } from '../components';
import { AgainstPokemonItem } from './components';
import * as againstPokemonModule from '../../modules/againstPokemon';
import * as searchPokemonModule from '../../modules/searchPokemon';
import { COLOR } from '../commonStyles';

class AgainstScreen extends React.Component {
  componentWillReceiveProps(newProps) {
    this.handleUpdatingAgainstPokemon(newProps);
  }

  handleUpdatingAgainstPokemon(newProps) {
    const { selectedPokemonId, currentAgainstPokemonIndex, clearSelectedPokemonId } = this.props;
    if (newProps.selectedPokemonId === selectedPokemonId
      && newProps.currentAgainstPokemonIndex === currentAgainstPokemonIndex) return;

    if (!newProps.selectedPokemonId || _.isNil(newProps.currentAgainstPokemonIndex)) return;

    const { updateAgainstPokemon } = this.props;
    updateAgainstPokemon({
      selectedPokemonId: newProps.selectedPokemonId,
      currentAgainstPokemonIndex: newProps.currentAgainstPokemonIndex,
    });
    clearSelectedPokemonId();
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
      return <AgainstPokemonItem pokemon={item} onPress={handleOnPress} />;
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
  clearSelectedPokemonId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  againstPokemons: againstPokemonModule.selectAgainstPokemons(state),
  selectedPokemonId: state.searchPokemon.selectedPokemonId,
  currentAgainstPokemonIndex: state.againstPokemon.currentAgainstPokemonIndex,
});

const mapDispatchToProps = {
  updateAgainstPokemonIndex: againstPokemonModule.updateAgainstPokemonIndex,
  updateAgainstPokemon: againstPokemonModule.updateAgainstPokemon,
  clearSelectedPokemonId: searchPokemonModule.clearSelectedPokemonId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgainstScreen);
