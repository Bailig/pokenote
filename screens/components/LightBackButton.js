import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR, elevation } from '../commonStyles';

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLOR.highContrastLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 84,
    right: 28,
    ...elevation(6),
  },
});

export const LightBackButton = props => (
  <TouchableHighlight style={styles.containerStyle} {...props}>
    <Icon name="close" type="font-awesome" color={COLOR.lowContrastDark} />
  </TouchableHighlight>
);
