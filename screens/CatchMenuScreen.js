import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import * as catchPokemonModule from '../modules/catchPokemon';
import { MenuScreenContainer, MenuButton } from './components';


const CatchMenuScreen = ({ navigation, removeCatchPokemon }) => {
  const handleRemoveSelections = () => {
    removeCatchPokemon();
    navigation.goBack();
  };
  const handleAddCatchPokemon = () => console.log(1);
  return (
    <MenuScreenContainer onBack={() => navigation.goBack()}>
      <MenuButton
        onPress={handleAddCatchPokemon}
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
  addCatchPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  // removeCatchPokemon: catchPokemonModule.removeCatchPokemon,
  // addCatchPokemon: catchPokemonModule.addCatchPokemon,
};

export default connect(null, mapDispatchToProps)(CatchMenuScreen);
