import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR } from '../commonStyles';
import { FloatingActionButton } from './FloatingActionButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLOR.lowContrastDark,
    position: 'absolute',
    bottom: 18,
    left: (SCREEN_WIDTH / 2) - 20,
  },
});

export const DarkBackButton = props => (
  <FloatingActionButton style={styles.containerStyle} {...props} size={40}>
    <Icon name="close" type="font-awesome" color={COLOR.highContrastLight} />
  </FloatingActionButton>
);
