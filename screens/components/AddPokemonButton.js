import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 56,
    backgroundColor: COLOR.lowContrastLight,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export const AddPokemonButton = props => (
  <TouchableHighlight
    style={styles.containerStyle}
    underlayColor={COLOR.lowContrastDark}
    {...props}
  >
    <Icon
      name="plus"
      type="font-awesome"
      color={COLOR.highContrastDark}
      size={32}
    />
  </TouchableHighlight>
);

AddPokemonButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
