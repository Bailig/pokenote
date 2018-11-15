import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as againstPokemonModule from '../modules/againstPokemon';
import { MenuScreenContainer, MenuButton } from './components';


const AgainstMenuScreen = ({ navigation, removeAgainstPokemon }) => {
  const handleRemoveSelections = () => {
    removeAgainstPokemon();
    navigation.goBack();
  };
  return (
    <MenuScreenContainer onBack={() => navigation.goBack()}>
      <MenuButton
        onPress={handleRemoveSelections}
        text="Remove Selections"
        iconName="trash"
      />
    </MenuScreenContainer>
  );
};

AgainstMenuScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  removeAgainstPokemon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeAgainstPokemon: againstPokemonModule.removeAgainstPokemon,
};

export default connect(null, mapDispatchToProps)(AgainstMenuScreen);
