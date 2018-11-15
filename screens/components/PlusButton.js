import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR, elevation } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: COLOR.lowContrastDark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    ...elevation(6),
  },
});

export const PlusButton = ({ ...props }) => (
  <TouchableHighlight {...props} style={styles.containerStyle}>
    <Icon name="plus" type="font-awesome" color={COLOR.highContrastLight} size={32} />
  </TouchableHighlight>
);
