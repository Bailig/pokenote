import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as catchPokemonModule from '../modules/catchPokemon';
import { MenuScreenContainer, MenuButton } from './components';


const CatchMenuScreen = (props) => {
  const { navigation, removeCatchPokemon } = props;

  const handleRemoveSelections = () => {
    removeCatchPokemon();
    navigation.goBack();
  };

  return (
    <MenuScreenContainer onBack={() => navigation.goBack()}>
      <MenuButton
        onPress={() => navigation.navigate('findPokemonToCatch')}
        text="Add Pokemon"
        iconName="plus-circle"
      />
      <MenuButton
        onPress={handleRemoveSelections}
        text="Remove Selections"
        iconName="trash"
      />
    </MenuScreenContainer>
  );
};

CatchMenuScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  removeCatchPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  // removeCatchPokemon: catchPokemonModule.removeCatchPokemon,
};

export default connect(undefined, mapDispatchToProps)(CatchMenuScreen);
