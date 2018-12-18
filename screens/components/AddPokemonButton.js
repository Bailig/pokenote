import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLOR } from '../commonStyles';
import { Card } from './Card';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const AddPokemonButton = props => (
  <Card>
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
  </Card>
);

AddPokemonButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
