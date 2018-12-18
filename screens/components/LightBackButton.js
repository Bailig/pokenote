import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR } from '../commonStyles';
import { FloatingActionButton } from './FloatingActionButton';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLOR.highContrastLight,
    position: 'absolute',
    bottom: 84,
    right: 28,
  },
});

export const LightBackButton = props => (
  <FloatingActionButton style={styles.containerStyle} size={40} {...props}>
    <Icon name="close" type="font-awesome" color={COLOR.lowContrastDark} />
  </FloatingActionButton>
);
