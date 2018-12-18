import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR } from '../commonStyles';
import { FloatingActionButton } from './FloatingActionButton';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLOR.lowContrastDark,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export const PlusButton = ({ ...props }) => (
  <FloatingActionButton {...props} style={styles.containerStyle} size={56}>
    <Icon name="plus" type="font-awesome" color={COLOR.highContrastLight} size={32} />
  </FloatingActionButton>
);
