import React from 'react';
import { TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLOR, elevation } from '../commonStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLOR.lowContrastDark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 18,
    left: (SCREEN_WIDTH / 2) - 20,
    ...elevation(6),
  },
});

export const DarkBackButton = props => (
  <TouchableHighlight style={styles.containerStyle} {...props}>
    <Icon name="close" type="font-awesome" color={COLOR.highContrastLight} />
  </TouchableHighlight>
);
