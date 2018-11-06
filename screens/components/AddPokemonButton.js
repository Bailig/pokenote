import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { HIGH_CONTRAST_DARK, LOW_CONTRAST_LIGHT, LOW_CONTRAST_DARK } from '../commonStyles';

export const AddPokemonButton = props => (
  <TouchableHighlight
    style={{
      flex: 1,
      height: 56,
      backgroundColor: LOW_CONTRAST_LIGHT,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    }}
    underlayColor={LOW_CONTRAST_DARK}
    {...props}
  >
    <Icon
      name="plus"
      type="font-awesome"
      color={HIGH_CONTRAST_DARK}
      size={32}
    />
  </TouchableHighlight>
);

AddPokemonButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
