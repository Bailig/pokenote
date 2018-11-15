import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLOR, TEXT_STYLE } from '../commonStyles';

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 12,
  },
  buttonContentContainerStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    height: 56,
  },
  buttonTextStyle: {
    ...TEXT_STYLE.subtitle1,
    marginRight: 12,
    color: COLOR.highContrastLight,
  },
  buttonIconStyle: {
    height: 30,
    width: 30,
  },
});

export const MenuButton = ({ onPress, text, iconName }) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.buttonStyle}
    underlayColor="transparent"
  >
    <View style={styles.buttonContentContainerStyle}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
      <Icon name={iconName} type="font-awesome" size={30} color={COLOR.highContrastLight} containerStyle={styles.buttonIconStyle} />
    </View>
  </TouchableHighlight>
);

MenuButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};
